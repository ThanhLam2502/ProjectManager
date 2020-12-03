using DevExtreme.AspNet.Data;
using ProjectManager.Entities.Repositories;
using ProjectManager.Entities.Services;
using ProjectManager.Entities.UnitOfWork;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ProjectManager.Services
{
    public class BaseService<TEntity> : IBaseService<TEntity> where TEntity : class {
		protected readonly IRepository<TEntity> Repository;        

        protected readonly IUnitOfWork UnitOfWork;

		public BaseService(IUnitOfWork unitOfWork)
		{
			UnitOfWork = unitOfWork;
			Repository = UnitOfWork.Repository<TEntity>();            
        }

        public TEntity Find(params object[] keyValues)
        {
            return Repository.Find(keyValues);
        }

        public async Task<TEntity> FindAsync(params object[] keyValues)
        {
            return await Repository.FindAsync(keyValues);
        }

        public IEnumerable<TEntity> GetAll()
        {
            return Repository.GetAll();
        }

        public async Task<IEnumerable<TEntity>> GetAllAsync()
        {
            return await Repository.GetAllAsync();
        }

        public void Delete(object id)
        {
            Repository.Delete(id);            
        }

        public void Insert(TEntity entity)
        {
            Repository.Insert(entity);            
        }

        public async Task InsertAsync(TEntity entity)
        {
            await Repository.InsertAsync(entity);
        }

        public void Update(TEntity entity)
        {
            Repository.Update(entity);
        }

        public virtual object LoadDataSource(DataSourceLoadOptions loadOptions)
        {
            return DataSourceLoader.Load(Repository.Entities, loadOptions);
        }
    }
}
