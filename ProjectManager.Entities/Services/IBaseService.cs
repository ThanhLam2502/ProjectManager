using System.Collections.Generic;
using System.Threading.Tasks;
using DevExtreme.AspNet.Data;

namespace ProjectManager.Entities.Services
{
	public interface IBaseService<TEntity> where TEntity : class
	{
        TEntity Find(params object[] keyValues);
        Task<TEntity> FindAsync(params object[] keyValues);

        IEnumerable<TEntity> GetAll();
        Task<IEnumerable<TEntity>> GetAllAsync();
        void Delete(object id);
        void Insert(TEntity entity);
        Task InsertAsync(TEntity entity);
        void Update(TEntity entity);
        object LoadDataSource(DataSourceLoadOptions loadOptions);
    }
}
