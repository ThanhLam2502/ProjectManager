using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ProjectManager.Entities.Repositories
{
    public interface IRepository<TEntity> where TEntity : class
	{
		DbSet<TEntity> Entities { get; }

		DbContext DbContext { get; }

		TEntity Find(params object[] keyValues);
		Task<TEntity> FindAsync(params object[] keyValues);
		
		IEnumerable<TEntity> GetAll();
		Task<IEnumerable<TEntity>> GetAllAsync();
		
		void Insert(TEntity entity);
		Task InsertAsync(TEntity entity);
		Task InsertRangeAsync(IEnumerable<TEntity> entities);
		void InsertRange(IEnumerable<TEntity> entities);
		
		void Update(TEntity entity);
		void UpdateRange(IEnumerable<TEntity> entities);

		void Delete(object id);
		void Delete(TEntity entity);
		void DeleteRange(IEnumerable<TEntity> entities);
		Task<int> SaveChangeAsync();
	}
}
