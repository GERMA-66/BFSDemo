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
var EnumImageStatus;
(function (EnumImageStatus) {
    EnumImageStatus[EnumImageStatus["UNDISCOVER"] = 0] = "UNDISCOVER";
    EnumImageStatus[EnumImageStatus["DISCOVER"] = 1] = "DISCOVER";
    EnumImageStatus[EnumImageStatus["VISITED"] = 2] = "VISITED";
})(EnumImageStatus || (EnumImageStatus = {}));
var TestImage = (function (_super) {
    __extends(TestImage, _super);
    function TestImage(i, j) {
        var _this = _super.call(this) || this;
        _this._i = i;
        _this._j = j;
        _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRmoveFromStageHandler, _this);
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStageHandler, _this);
        return _this;
    }
    TestImage.prototype.onRmoveFromStageHandler = function () {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRmoveFromStageHandler, this);
    };
    TestImage.prototype.onAddToStageHandler = function () {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStageHandler, this);
        this.init();
    };
    TestImage.prototype.init = function () {
        this.bitmap = new egret.Bitmap(RES.getRes("bg_jpg"));
        this.bitmap.width = this.bitmap.height = 100;
        this.addChild(this.bitmap);
        this.touchEnabled = true;
        this.status = EnumImageStatus.UNDISCOVER;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchTapHandler, this);
    };
    TestImage.prototype.touchTapHandler = function () {
        egret.MainContext.instance.stage.dispatchEventWith("image", false, this);
    };
    TestImage.prototype.playEff = function () {
        this.light();
    };
    TestImage.prototype.light = function () {
        var _this = this;
        var colorMatrix = [
            1, 0, 0, 0, 226,
            0, 1, 0, 0, 218,
            0, 0, 1, 0, 164,
            0, 0, 0, 1, 0
        ];
        var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
        this.bitmap.filters = [colorFlilter];
        var clearFilter = function () {
            if (_this.bitmap) {
                _this.bitmap.filters = [];
            }
        };
        egret.Tween.get(this.bitmap).wait(150).call(clearFilter, this);
    };
    Object.defineProperty(TestImage.prototype, "i", {
        get: function () {
            return this._i;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TestImage.prototype, "j", {
        get: function () {
            return this._j;
        },
        enumerable: true,
        configurable: true
    });
    return TestImage;
}(egret.Sprite));
__reflect(TestImage.prototype, "TestImage");
//# sourceMappingURL=TestImage.js.map