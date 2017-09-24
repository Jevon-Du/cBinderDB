package controllers

import (
	"github.com/astaxie/beego"
)

type MainController struct {
	beego.Controller
}

func (this *MainController) Index() {
	this.TplName = "index.html"
}
func (this *MainController) Search() {
	this.TplName = "search.html"
}
