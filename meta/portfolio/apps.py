



from django.apps import AppConfig
from django.contrib.admin.apps import AdminConfig



class PortfolioConfig( AppConfig ):
	name = 'portfolio'



class AdminConfig( AdminConfig ):
	default_site = 'meta.portfolio.admin.site'



admin = AdminConfig



