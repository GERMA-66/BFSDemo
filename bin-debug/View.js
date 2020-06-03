var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var View = (function (_super) {
    __extends(View, _super);
    function View() {
        var _this = _super.call(this) || this;
        _this.arr = [];
        _this.init();
        return _this;
    }
    View.prototype.init = function () {
        egret.MainContext.instance.stage.addEventListener("image", this.touchTapHandler, this);
        this.con = new egret.DisplayObjectContainer();
        for (var i = 0; i < 30; i++) {
            this.arr[i] = [];
            for (var j = 0; j < 30; j++) {
                this.arr[i][j] = new TestImage(i, j);
                this.arr[i][j].x = j * 100;
                this.arr[i][j].y = i * 100;
                this.con.addChild(this.arr[i][j]);
            }
        }
        // this.con.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchTapHandler, this);
        // this.con.touchEnabled = true;
        this.addChild(this.con);
    };
    View.prototype.touchTapHandler = function (e) {
        this.bfs(e.data);
    };
    View.prototype.bfs = function (img) {
        var arr = [];
        img.status = EnumImageStatus.DISCOVER;
        var timer = egret.getTimer();
        img.playEff();
        arr.push(img);
        var count = 1;
        while (arr.length) {
            var image = arr.shift();
            for (var i = image.i - 1; i <= image.i + 1; i++) {
                for (var j = image.j - 1; j <= image.j + 1; j++) {
                    if (i == image.i && j == image.j) {
                        continue;
                    }
                    var nextNbr = this.nextNbr(i, j);
                    if (nextNbr && nextNbr.status == EnumImageStatus.UNDISCOVER) {
                        nextNbr.status = EnumImageStatus.DISCOVER;
                        nextNbr.playEff();
                        arr.push(nextNbr);
                        count++;
                    }
                }
            }
            image.status = EnumImageStatus.VISITED;
        }
        egret.error(egret.getTimer() - timer);
        egret.log(count);
    };
    View.prototype.nextNbr = function (i, j) {
        if (this.exisit(i, j)) {
            return this.arr[i][j];
        }
    };
    View.prototype.exisit = function (i, j) {
        return 0 <= i && i < this.arr.length && 0 <= j && j <= this.arr[i].length && this.arr[i][j] != null;
    };
    return View;
}(egret.Sprite));
__reflect(View.prototype, "View");
//# sourceMappingURL=View.js.map