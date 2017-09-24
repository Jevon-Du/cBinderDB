package routers

import (
	"cbinder/controllers"
	"github.com/astaxie/beego"
)

func init() {
	beego.Router("/", &controllers.MainController{}, "*:Index")
	beego.Router("/home", &controllers.MainController{}, "*:Index")
	beego.Router("/search", &controllers.MainController{}, "*:Search")
}
