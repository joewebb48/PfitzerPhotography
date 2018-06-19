



from django.urls import path

from meta import views



urlpatterns = [
	path( '', views.index, name = 'index' ),
	path( 'photos', views.photos, name = 'photos' ),
	#path( '<path:url>', views.index, name = 'wild' ),
]


