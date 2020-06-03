enum EnumImageStatus {
	UNDISCOVER,//未被发现
	DISCOVER,//发现
	VISITED,//访问完毕
}
class TestImage extends egret.Sprite {

	public status: number;
	private bitmap: egret.Bitmap;

	private _i: number;
	private _j: number;

	public constructor(i: number, j: number) {
		super();
		this._i = i;
		this._j = j;
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRmoveFromStageHandler, this);
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStageHandler, this);
	}

	private onRmoveFromStageHandler(): void {
		this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRmoveFromStageHandler, this);
	}

	private onAddToStageHandler(): void {
		this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStageHandler, this);
		this.init();
	}

	private init(): void {
		this.bitmap = new egret.Bitmap(RES.getRes("bg_jpg"));
		this.bitmap.width = this.bitmap.height = 100;
		this.addChild(this.bitmap);
		this.touchEnabled = true;
		this.status = EnumImageStatus.UNDISCOVER;
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchTapHandler, this);
	}

	private touchTapHandler(): void {
		if (this.status == EnumImageStatus.VISITED) {
			return;
		}
		egret.MainContext.instance.stage.dispatchEventWith("image", false, this);
	}

	public playEff(): void {
		this.light();
	}

	private light(): void {
		var colorMatrix = [
			1, 0, 0, 0, 226,
			0, 1, 0, 0, 218,
			0, 0, 1, 0, 164,
			0, 0, 0, 1, 0
		];
		var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
		this.bitmap.filters = [colorFlilter];
		var clearFilter = () => {
			if (this.bitmap) {
				this.bitmap.filters = [];
			}
		}
		egret.Tween.get(this.bitmap).wait(150).call(clearFilter, this);
	}

	public get i(): number {
		return this._i;
	}

	public get j(): number {
		return this._j;
	}
}