using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using ProjectManager.Entities.UnitOfWork;
using ProjectManager.Entities.Models;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using Sample.Entities.Models;
using ProjectManager.Entities.Utilities;
using ProjectManager.Entities.Repositories;

namespace ProjectManager.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        private IDbContextTransaction _transaction;
        private IsolationLevel? _isolationLevel;
        private Dictionary<string, dynamic> Repositories { get; }
        private readonly GlobalSettings _setting;

        public DbContext Context { get; }

        public UnitOfWork(GlobalSettings setting, AppContext context)
        {
            _setting = setting;
            Context = context ?? InitLayersContext();
            Repositories = new Dictionary<string, dynamic>();            
        }

        public AppContext InitLayersContext()
        {
            var optionsBuilder = new DbContextOptionsBuilder<AppContext>();
            optionsBuilder.UseSqlServer(_setting.ConnectionString);

            return new AppContext(optionsBuilder.Options);
        }

        private void StartNewTransactionIfNeeded()
        {
            if (_transaction == null)
            {
                _transaction = _isolationLevel.HasValue ?
                    Context.Database.BeginTransaction(_isolationLevel.GetValueOrDefault()) : Context.Database.BeginTransaction();
            }
        }

        public void BeginTransaction()
        {
            StartNewTransactionIfNeeded();
        }

        public void CommitTransaction()
        {
            /*
			 do not open transaction here, because if during the request
			 nothing was changed(only select queries were run), we don't
			 want to open and commit an empty transaction -calling SaveChanges()
			 on _transactionProvider will not send any sql to database in such case
			*/
            Context.SaveChanges();

            if (_transaction == null) return;
            _transaction.Commit();

            _transaction.Dispose();
            _transaction = null;
        }

        public void RollbackTransaction()
        {
            if (_transaction == null) return;

            _transaction.Rollback();

            _transaction.Dispose();
            _transaction = null;
        }

        public int SaveChanges()
        {
            return Context.SaveChanges();
        }

        public async Task<int> SaveChangesAsync()
        {
            return await Context.SaveChangesAsync();
        }

        public void SetIsolationLevel(IsolationLevel isolationLevel)
        {
            _isolationLevel = isolationLevel;
        }

        public void Dispose()
        {
            _transaction?.Dispose();

            _transaction = null;
        }

        public IRepository<TEntity> Repository<TEntity>() where TEntity : class
        {
            var type = typeof(TEntity).Name;

            if (Repositories.ContainsKey(type))
            {
                return (IRepository<TEntity>)Repositories[type];
            }

            Repositories.Add(type, new Repository<TEntity>(Context));

            return Repositories[type];
        }
    }
}
