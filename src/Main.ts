class Main extends eui.UILayer {


    protected createChildren(): void {
        super.createChildren();

        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin
        })

        egret.lifecycle.onPause = () => {
            egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
        }

        //inject the custom material parser
        //注入自定义的素材解析器
        let assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());


        this.runGame().catch(e => {
            console.log(e);
        })
    }

    private async runGame() {
        await this.loadResource()
        this.createGameScene();
        const result = await RES.getResAsync("description_json")
        await platform.login();
        const userInfo = await platform.getUserInfo();
        console.log(userInfo);

    }

    private async loadResource() {
        try {
            const loadingView = new LoadingUI();
            this.stage.addChild(loadingView);
            await RES.loadConfig("resource/default.res.json", "resource/");
            await this.loadTheme();
            await RES.loadGroup("preload", 0, loadingView);
            this.stage.removeChild(loadingView);
        }
        catch (e) {
            console.error(e);
        }
    }

    private loadTheme() {
        return new Promise((resolve, reject) => {
            // load skin theme configuration file, you can manually modify the file. And replace the default skin.
            //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
            let theme = new eui.Theme("resource/default.thm.json", this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, () => {
                resolve();
            }, this);

        })
    }
    /**
     * 创建场景界面
     * Create scene interface
     */
    protected createGameScene(): void {
        // var button: eui.Button = new eui.Button();
        // this.addChild(button);
        // button.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
        //     var arr: number[] = [];
        //     for (var i: number = 0; i < 1000; i++) {
        //         arr.push(Math.floor(1000 - i));
        //     }
        //     this.mergeSort(arr, 0, arr.length);
        //     egret.log(arr);
        // }, this);
        // button.x = 300;
        // button.y = 300;
        this.addChild(new View());
    }

    private mergeSort(arr: number[], lo: number, hi: number): void {
        if (hi - lo < 2) return;

        var mi: number = (lo + hi) >> 1;
        this.mergeSort(arr, lo, mi);
        this.mergeSort(arr, mi, hi);
        this.merge(arr, lo, mi, hi);
    }

    private merge(arr: number[], lo: number, mi: number, hi: number): void {
        var A: number[] = arr.slice(lo, hi);
        // egret.log(A);
        var lb: number = mi - lo;
        var B: number[] = new Array(lb);
        for (var i = 0; i < lb; B[i] = A[i++]);
        var lc: number = hi - mi;
        // egret.log(lb, lc);
        var C: number[] = arr.slice(mi, hi);
        for (var i = 0, j = 0, k = 0; j < lb;) {
            if (k < lc && C[k] < B[j]) {
                A[i++] = C[k++];
            }
            if (lc <= k || B[j] <= C[k]) {
                A[i++] = B[j++];
            }
        }
        for (var i = 0; i < A.length; arr[lo + i] = A[i++]);
        B.length = 0;
        C.length = 0;
        A.length = 0;
        // egret.log(arr);
    }
}
