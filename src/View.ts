class View extends egret.Sprite {

	private arr: TestImage[][] = [];
	private con: egret.DisplayObjectContainer;
	public constructor() {
		super();
		this.init();
	}

	protected init(): void {
		egret.MainContext.instance.stage.addEventListener("image", this.touchTapHandler, this);
		this.con = new egret.DisplayObjectContainer();

		for (let i = 0; i < 30; i++) {
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
	}
	private touchTapHandler(e: egret.Event): void {
		this.bfs(e.data);
	}

	private bfs(img: TestImage): void {
		var arr: TestImage[] = [];
		img.status = EnumImageStatus.DISCOVER;
		var timer: number = egret.getTimer();
		img.playEff();
		arr.push(img);
		var count: number = 1;
		while (arr.length) {
			var image: TestImage = arr.shift();
			for (var i = image.i - 1; i <= image.i + 1; i++) {
				for (var j = image.j - 1; j <= image.j + 1; j++) {
					if (i == image.i && j == image.j) {
						continue;
					}
					var nextNbr: TestImage = this.nextNbr(i, j);
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
	}

	private nextNbr(i, j): TestImage {
		if (this.exisit(i, j)) {
			return this.arr[i][j];
		}
	}

	private exisit(i: number, j: number): boolean {
		return 0 <= i && i < this.arr.length && 0 <= j && j <= this.arr[i].length && this.arr[i][j] != null;
	}
}