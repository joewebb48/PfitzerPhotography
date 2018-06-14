



from django.forms import ClearableFileInput



class ImageWidget( ClearableFileInput ):
	input_text = 'Update'
	template_name = 'widget.html'
	
	def get_context( self, name, value, attrs ):
		context = super( ).get_context( name, value, attrs )
		context[ 'widget' ].update( )
		return context
	
	
	class Media:
		css = { 'all': [ '../root/admin.css' ] }



