



from django.contrib import admin

from meta.portfolio.admin import SettingAdmin, PageAdmin, ImageAdmin, MediaAdmin
from meta.portfolio.models import Setting, Page, Image, Media



class AdminSite( admin.AdminSite ):
	site_title = 'Pfitzer Photography Admin'
	site_header = 'Pfitzer Photography Administration'
	index_title = site_header
	
	def __init__( self ):
		super( ).__init__( )
		self.register( Setting, SettingAdmin )
		self.register( Page, PageAdmin )
		self.register( Image, ImageAdmin )
		self.register( Media, MediaAdmin )



site = AdminSite



