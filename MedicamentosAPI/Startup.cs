using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.EntityFrameworkCore;
using MedicamentosAPI.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace MedicamentosAPI
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
            services.AddMvc();

            services.AddDbContext<MedicamentosAPIContext>(options =>
                    options.UseSqlServer(Configuration.GetConnectionString("MedicamentosAPIContext")));

            services.AddIdentity<UserEntity, IdentityRole>().
                AddEntityFrameworkStores<MedicamentosAPIContext>().
                AddDefaultTokenProviders();

            services.AddAuthentication(authenticationOptions => 
            {
                authenticationOptions.DefaultScheme = "Cookies";
                authenticationOptions.DefaultChallengeScheme = "Cookies";
            })

            .AddCookie(config => 
            config.Events = new CookieAuthenticationEvents
            {               
                    OnRedirectToLogin = ctx => 
                    {
                        if (ctx.Request.Path.StartsWithSegments("/api") && ctx.Response.StatusCode == 200)
                        {
                            ctx.Response.StatusCode = 401;
                            return Task.FromResult<object>(null);
                        }
                        ctx.Response.Redirect(ctx.RedirectUri);
                        return Task.FromResult<object>(null);
                    }
                }
            )

            .AddJwtBearer(config =>
            {
                config.TokenValidationParameters = new TokenValidationParameters
                {
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
                        Configuration.GetSection("AppConfiguration:Key").Value)),
                    ValidAudience = Configuration.GetSection("AppConfiguration:SiteUrl").Value,
                    ValidateIssuerSigningKey = true,
                    ValidateLifetime = true,
                    ValidIssuer = Configuration.GetSection("AppConfiguration:SiteUrl").Value
                };
                config.Events = new JwtBearerEvents
                {
                    OnAuthenticationFailed = ctx => 
                    {
                        ctx.Response.StatusCode = 401;
                        return Task.FromResult<object>(null);
                    }
                };
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseAuthentication();
            app.UseMvc();
        }
    }
}
