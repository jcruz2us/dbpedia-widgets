import tornado.ioloop
import tornado.web

class ResourceHandler(tornado.web.RequestHandler):
    """
        Handles a request for a dbpedia resource.
        It requests all the facts for a given resource
        and generates a formatted JSON response
    """
    def get(self, uri):
        self.write({ "uri": uri })

def main():
    application = tornado.web.Application([
            #a single request argument, the resource URI, will be passed in the URL
            #regex will match any amount of non-whitespace characters
            #sample - /resource/http://dbpedia.org/resource/Sample
            (r'/resource/(\S*)', ResourceHandler)
        ])
    application.listen(8000)
    tornado.ioloop.IOLoop.instance().start()


if __name__ == '__main__':
    main()