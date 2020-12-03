using DevExtreme.AspNet.Data;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using ProjectManager.Entities.Resources;
using ProjectManager.Entities.Services;
using ProjectManager.Entities.Utilities;
using System;
using System.Threading.Tasks;

namespace ProjectManager.APIs.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BaseController<TEntity> : ControllerBase where TEntity : class, new()
    {
        private readonly IBaseService<TEntity> _baseService;
        public BaseController(IBaseService<TEntity> baseService)
        {
            _baseService = baseService;

        }

        /// <summary>
        /// New an object depend on its type
        /// </summary>
        /// <returns>new Entity object</returns>
        protected TEntity GetObject()
        {
            return new TEntity();
        }

        [HttpGet]
        public virtual IActionResult Get(DataSourceLoadOptions loadOptions)
        {
            return new JsonResult(_baseService.LoadDataSource(loadOptions));
        }

        [HttpPost]
        public virtual async Task<IActionResult> Post([FromForm] string values)
        {
            var data = GetObject();            

            try
            {
                JsonConvert.PopulateObject(values, data);

                if (!TryValidateModel(data))
                    return BadRequest(Messages.ActionFailed);

                await _baseService.InsertAsync(data);
            }
            catch (Exception)
            {
                throw new AppException(Messages.ActionFailed);
            }
            
            return new JsonResult(new
            {
                message = Messages.ItemInserted,
                data
            });
        }

        [HttpPut]
        public virtual async Task<IActionResult> Put([FromForm] string key,[FromForm] string values)
        {
            TEntity data;
            int id;

            if (int.TryParse(key, out id))
            {
                data = await _baseService.FindAsync(id);
            }
            else
            {
                data = await _baseService.FindAsync(key);
            }

            try
            {                
                JsonConvert.PopulateObject(values, data);

                if (!TryValidateModel(data))
                    return BadRequest(Messages.ActionFailed);

                _baseService.Update(data);
            }
            catch (Exception)
            {
                throw new AppException(Messages.ActionFailed);
            }

            return Ok(new
            {
                message = Messages.ItemUpdated,
                data
            });
        }

        // DELETE api/values/5
        [HttpDelete]
        public virtual IActionResult Delete([FromForm] string key)
        {
            try
            {
                int id;
                
                if (int.TryParse(key, out id))
                {
                    _baseService.Delete(id);
                }
                else
                {
                    _baseService.Delete(key);
                }               
            }
            catch (Exception)
            {
                throw new AppException(Messages.ActionFailed);
            }            

            return new JsonResult(new
            {
                message = Messages.ItemDeleted
            });
        }
    }
}