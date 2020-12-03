using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using ProjectManager.Entities.Services;
using ProjectManager.Entities.UnitOfWork;
using ProjectManager.Entities.Utilities;
using ProjectManager.Repositories;
using Sample.Entities.Models;
using System.Security.Claims;
using System.Text;

namespace ProjectManager.APIs.Configurations
{
    public static class Bootstrapper
    {
        private const string NLogConfigPath = "nlog.config";
        public static void RegisterServices(this IServiceCollection services, GlobalSettings settings)
        {
            // Auto mapper
            services.AddSingleton<IMapper, Mapper>();
            services.AddSingleton<IConfigurationProvider>(c => new MapperConfiguration(config => config.AddProfile<AutoMapperConfig>()));

            // Logger
            var logger = NLog.Web.NLogBuilder.ConfigureNLog(NLogConfigPath).GetCurrentClassLogger();
            services.AddSingleton<NLog.ILogger>(logger);

            // Don't load navigation properties
            services.AddDbContext<AppContext>(_ => _.UseSqlServer(settings.ConnectionString));
            // Load navigation properties
            // Need refer Microsoft.EntityFrameworkCore.Proxies
            //services.AddDbContext<Entities.Contexts.AppContext>(_ => _.UseLazyLoadingProxies().UseSqlServer(settings.ConnectionString));

            // Unit of Work
            services.AddTransient<IUnitOfWork, UnitOfWork>();

            // BEGIN Services                
            
            // END Services
        }

        public static void RegisterJsonSerializer(this IMvcBuilder mvcBuilder)
        {
            mvcBuilder.AddJsonOptions(options =>
            {
                options.SerializerSettings.Formatting = Formatting.Indented;
                options.SerializerSettings.DateTimeZoneHandling = DateTimeZoneHandling.Local;                
                options.SerializerSettings.DateFormatString = "MM/dd/yy H:mm:ss";
                options.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
                options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
            });
        }

        public static void RegisterAuthentication(this IServiceCollection services, GlobalSettings settings)
        {
            var tokenKey = Encoding.ASCII.GetBytes(settings.TokenSettings.SecretKey);
            services.AddAuthentication(x =>
                {
                    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                })
                .AddJwtBearer(x =>
                {
                    x.Events = new JwtBearerEvents
                    {
                        OnTokenValidated = async context =>
                        {
                            var authenticateService = services.BuildServiceProvider().GetRequiredService<IAuthenticateService>();                            
                            var layers = await authenticateService.GetUser(context.Principal.Identity.Name);
                            if (layers == null)
                            {
                                context.Fail("Unauthorized");
                            }
                        }
                    };
                    x.RequireHttpsMetadata = false;
                    x.SaveToken = true;
                    x.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(tokenKey),
                        ValidateIssuer = false,
                        ValidateAudience = false
                    };
                });
            //
            // Claims-Based Authorization
            services.AddAuthorization(opts =>
            {
                opts.AddPolicy("Layer", p =>
                {
                    // Using value text for demo show, else use enum : ClaimTypes.Role
                    p.RequireClaim(ClaimTypes.Role, "Layer");
                });
            });
        }
    }
}
