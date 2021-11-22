/*:zh
 * @plugindesc 用来测试的脚本
 * @author 火焰库拉
 * @help 总之就是用来做测试的脚本
 * 这一行是测试这个说明文字会不会换行
 * @param showMessage
 * @desc 用来测试变量以及变量可否作为命令名称的变量
 * @default	showMessage
 * @param valueAdd
 * @desc 用来测试变量以及变量可否作为命令名称的变量
 * @default	valueAdd
 * @param getPlayerDirection
 * @desc 用来测试变量以及变量可否作为命令名称的变量
 * @default	getPlayerDirection
 */
//外部包围的匿名方法，以及匿名方法外部的括号+括号是为了让它立刻执行，并且内部变量和外部变量不会冲突
(function () {
    //获取变量名，字符串是js文件的名称,返回变量和值的键值对
    var Commands = PluginManager.parameters("Test");
    //获取变量值，以及设置没获取到的默认值，因为是utf-8编码，所以支持中文
    var showMessage = Commands["showMessage"] || "showMessage";
    var valueAdd = Commands["valueAdd"] || "valueAdd";
    var getPlayerDirection = Commands["getPlayerDirection"] || "getPlayerDirection";
    //pluginCommand方法是使用插件指令必需的方法，为了防止方法被覆盖
    //需要先将原来的方法缓存起来，在新方法的最前面调用，类似super()
    var pluginCommand = Game_Interpreter.prototype.pluginCommand;
    /**
     * 接收插件指令的方法
     * @param {*} command 指令名称
     * @param {*} args 指令参数，是字符串数组，以空格分隔
     * @example
     * "Test 0 1 2 3"会收到 command:"Test",args:["0","1","2","3"]
     */
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
        pluginCommand(command, args);
        switch (command) {
            case showMessage:
                console.log(command, args);
                $gameSystem.TestCommand(args[0]);
                break;
            case valueAdd:
                console.log(command, args);
                $gameSystem.AddValue(args[0], args[1]);
                break;
            case getPlayerDirection:
                $gameSystem.getPlayerDirection();
                break;
        }
    };
    //在原来有的命名空间下的prototype中添加方法，可以使用调用系统方法的方式调用自己的方法
    Game_System.prototype.TestCommand = function (params) {
        $gameMessage.setScroll(10, true);
        $gameMessage.add("Text：" + params);
    };

    Game_System.prototype.AddValue = function (id, params) {
        console.log($gameVariables.value, "AddValue:" + id + " - " + params);
        console.log($gameVariables.value(id));
        $gameVariables.setValue(id, $gameVariables.value(id) + Number(params));
        console.log($gameVariables.value(id));
    };

    Game_System.prototype.getPlayerDirection = function () {
        let str = "";
        switch ($gamePlayer.direction()) {
            case 2:
                //down
                str = "down";
                break;
            case 4:
                //left
                str = "left";
                break;
            case 6:
                //right
                str = "right";
                break;
            case 8:
                //up
                str = "up";
                break;
        }
        return str;
    };
})();
