using System.Data;
using System.Threading.Tasks;
using ProjectManager.Entities.Repositories;

namespace ProjectManager.Entities.UnitOfWork
{
	public interface IUnitOfWork
	{

		IRepository<T> Repository<T>() where T : class;
		/// <summary>
		/// Opens a new transaction
		/// </summary>
		void BeginTransaction();

		/// <summary>
		/// Commits the current transaction (does nothing when none exists).
		/// </summary>
		void CommitTransaction();

		/// <summary>
		/// Rolls back the current transaction (does nothing when none exists).
		/// </summary>
		void RollbackTransaction();

		/// <summary>
		/// Saves changes to database, previously opening a transaction
		/// only when none exists. The transaction is opened with isolation
		/// level set in Unit of Work before calling this method.
		/// </summary>
		int SaveChanges();

		/// <summary>
		/// 
		/// </summary>
		/// <returns></returns>
		Task<int> SaveChangesAsync();

		/// <summary>
		/// Sets the isolation level for new transactions.
		/// </summary>
		/// <param name="isolationLevel"></param>
		void SetIsolationLevel(IsolationLevel isolationLevel);
	}
}
