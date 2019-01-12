



from django.apps import AppConfig
from django.contrib.admin.apps import AdminConfig



class MetaConfig( AppConfig ):
	name = 'meta'



class AdminConfig( AdminConfig ):
	default_site = 'meta.admin.site'



admin = AdminConfig



