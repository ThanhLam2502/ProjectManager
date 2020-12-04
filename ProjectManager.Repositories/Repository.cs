using Microsoft.EntityFrameworkCore;
using ProjectManager.Entities.Repositories;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectManager.Repositories
{
    public class Repository<TEntity> : IRepository<TEntity> where TEntity : class
	{
        public DbSet<TEntity> Entities => DbContext.Set<TEntity>();

        public DbContext DbContext { get; }

        public Repository(DbContext context)
		{
			DbContext = context;
		}

		public void Delete(object id)
		{
			var entity = Entities.Find(id);
			Delete(entity);
		}

		public void Delete(TEntity entity)
		{
			Entities.Remove(entity);

            DbContext.SaveChanges();

        }

		public void DeleteRange(IEnumerable<TEntity> entities)
		{
			Entities.RemoveRange(entities);

            DbContext.SaveChanges();
        }

		public TEntity Find(params object[] keyValues)
		{
			return Entities.Find(keyValues);
		}

		public virtual async Task<TEntity> FindAsync(params object[] keyValues)
		{
			return await Entities.FindAsync(keyValues);
		}

		public IEnumerable<TEntity> GetAll()
		{
			return Entities.ToList();
		}

		public async Task<IEnumerable<TEntity>> GetAllAsync()
		{
			return await Entities.ToListAsync();
		}

		public void Insert(TEntity entity)
		{
			Entities.Add(entity);
            DbContext.SaveChanges();
		}

		public async Task InsertAsync(TEntity entity)
		{
			await Entities.AddAsync(entity);
            await DbContext.SaveChangesAsync();
        }

		public async Task InsertRangeAsync(IEnumerable<TEntity> entities)
		{
			foreach (var entity in entities)
			{
				await Entities.AddAsync(entity);
			}

            await DbContext.SaveChangesAsync();
        }

		public virtual void InsertRange(IEnumerable<TEntity> entities)
		{
			foreach (var entity in entities)
			{
				Insert(entity);
			}

            DbContext.SaveChanges();
        }

		public void Update(TEntity entity)
		{
			Entities.Update(entity);

            DbContext.SaveChanges();
        }

		public void UpdateRange(IEnumerable<TEntity> entities)
		{
			Entities.UpdateRange(entities);

            DbContext.SaveChanges();
        }
		public async Task<int> SaveChangesAsync()
		{
			return await DbContext.SaveChangesAsync();
		}
	}
}
