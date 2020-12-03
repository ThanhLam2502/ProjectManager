using System.Collections.Generic;
using System.IO;
using AutoMapper;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using NLog;
using ProjectManager.APIs.Configurations;
using ProjectManager.Entities.Services;
using ProjectManager.Entities.Utilities;
using ProjectManager.Services;

namespace ProjectManager.APIs
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services
                .Configure<GlobalSettings>(Configuration.GetSection("Configurations"))
                .AddSingleton(_ => _.GetRequiredService<IOptions<GlobalSettings>>().Value);
            services.AddCors();

            var settings = services.BuildServiceProvider().GetRequiredService<GlobalSettings>();
            // Register db context, repositories and services
            services.RegisterServices(settings);
            // Authentication
            //services.RegisterAuthentication(settings);

            //BEGIN SERVICE
            services.AddScoped<IProjectService, ProjectService>();
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<ITaskService, TaskService>();
            services.AddScoped<ITodoService, TodoService>();
            services.AddScoped<ICommentService, CommentService>();
            //END SERVICE

            #region auto mapper
            services.AddSingleton<IMapper, Mapper>();
            services.AddSingleton<AutoMapper.IConfigurationProvider>(c => new MapperConfiguration(config => config.AddProfile<AutoMapperConfig>()));

            #endregion

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2).RegisterJsonSerializer();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILogger logger)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                // Enable Cors
                app.UseCors(
                    options => options
                        .AllowAnyMethod()
                        .AllowAnyHeader()
                        .AllowAnyOrigin()
                );
            }
            else
            {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.Use(async (context, next) =>
            {
                await next();
                if (context.Response.StatusCode == 404 && !Path.HasExtension(context.Request.Path.Value)
                                                       && !context.Request.Path.Value.StartsWith("/api"))
                {
                    context.Request.Path = "/index.html";
                    await next();
                }
            });

            app.UseExceptionHandler(new ExceptionHandlerOptions
            {
                ExceptionHandler = new ExceptionMiddleware(env, logger).Invoke
            });

            app.UseDefaultFiles(new DefaultFilesOptions { DefaultFileNames = new List<string> { "index.html" } });
            app.UseStaticFiles();
            app.UseHttpsRedirection();
            //app.UseAuthentication();            
            app.UseMvc();            
        }
    }
}
