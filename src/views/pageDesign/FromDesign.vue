<template>
    <div id="formDesign">
        <div class="formDesign-left" @dragstart="drag($event)" @click="leftBtnClick($event)">
            <el-tabs type="border-card">
                <el-tab-pane label="表单字段">
                    <div v-for="(item, index) in leftBtnData" :key="index">
                        <div class="card-tit">{{item.tit}}<i class="el-icon-female"></i></div>
                        <div class="card-content-btn">
                            <el-button v-for="(val,length) in item.btn"
                                       :key="val.name"
                                       type="primary"
                                       :data-parent="index"
                                       :data-my="length"
                                       draggable="true"
                                       size="small" plain
                                       :icon="val.icon">{{val.name}}
                            </el-button>
                        </div>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
        <div class="formDesign-center">
            <div class="c-head">
                <span class="c-card-name">{{twoFormLabelAlign.title}}</span>
                <div>
                    <el-button type="primary" size="mini" icon="el-icon-monitor">PC预览</el-button>
                    <el-button type="primary" size="mini" icon="el-icon-mobile">手机预览</el-button>
                    <el-button type="primary" size="mini" icon="el-icon-suitcase">应用</el-button>
                </div>
            </div>
            <div id="c-box" @dragstart="drag($event)"
                 @drop="drop($event)"
                 @click="boxClick($event)"
                 @dragover="allowDrop($event)">
                <div class="b-before">
                    请从右侧拖拽或点击添加字段
                </div>
            </div>
        </div>
        <div class="formDesign-right">
            <el-tabs type="border-card" v-model="tabsActiveName">
                <el-tab-pane label="编辑字段" name="one">编辑字段</el-tab-pane>
                <el-tab-pane label="表单属性" name="two">
                    <div class="card-tit">表单属性<i class="el-icon-female"></i></div>
                    <div class="card-content-btn">
                        <el-form style="width: 100%;" label-position="top" label-width="80px" ref="twoFormLabelAlign" :model="twoFormLabelAlign">
                            <el-form-item label="表单标题" prop="title" :rules="{
                              required: true, message: '域名不能为空'
                            }">
                                <el-input v-model="twoFormLabelAlign.title"
                                          maxlength="6"
                                          show-word-limit
                                          type="text"></el-input>
                            </el-form-item>
                            <el-form-item label="表单key">
                                <el-input readonly v-model="twoFormLabelAlign.key"></el-input>
                            </el-form-item>
                            <el-form-item label="表单分类">
                                <el-select style="width: 100%;" v-model="twoFormLabelAlign.type" placeholder="请选择表单分类">
                                    <el-option label="区域一" value="shanghai"></el-option>
                                    <el-option label="区域二" value="beijing"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="表单描述" prop="desc">
                                <el-input type="textarea" v-model="twoFormLabelAlign.desc"></el-input>
                            </el-form-item>
                        </el-form>
                    </div>
                    <div class="card-tit">表单提交校验<i class="el-icon-female"></i></div>
                    <div class="card-content-btn">
                        <el-button  style="width: 100%;" type="primary" size="small">添加校验</el-button>
                    </div>
                    <div class="card-tit">表单规则<i class="el-icon-female"></i></div>
                    <div class="card-content-btn">
                        <el-button  style="width: 100%;" type="primary" size="small">设置表单规则</el-button>
                    </div>
                    <div class="card-tit">其他设置<i class="el-icon-female"></i></div>
                    <div class="card-content-btn">
                        <el-form ref="twoFormLast" label-position="top" :model="twoFormLast" label-width="80px">
                            <el-form-item>
                                <el-checkbox-group v-model="twoFormLast.type">
                                    <el-checkbox label="隐藏标题" name="type"></el-checkbox>
                                    <el-checkbox label="隐藏描述" name="type"></el-checkbox>
                                    <el-checkbox label="当前为必填项" name="type"></el-checkbox>
                                    <el-checkbox label="文本只读显示" name="type"></el-checkbox>
                                </el-checkbox-group>
                            </el-form-item>

                        </el-form>
                    </div>

                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
    import $ from "jquery";

    const leftBtnData = [
        {
            tit: "通用字段", btn: [{
                name: "单行文本",
                icon: "el-icon-notebook-1",
                html: "<input type=\"text\" readonly class=\"el-input__inner\">"
            }, {
                name: "多行文本",
                icon: "el-icon-notebook-2",
                html: "<textarea class=\"el-textarea__inner\"></textarea>"
            }, {
                name: "数字框",
                icon: "el-icon-news",
                html: "<input type=\"number\" readonly class=\"el-input__inner\">"
            }, {
                name: "单项选择",
                icon: "el-icon-tickets"
            }, {
                name: "多项选择",
                icon: "el-icon-document-copy"
            }, {
                name: "下拉框",
                icon: "el-icon-film"
            }, {
                name: "日期组件",
                icon: "el-icon-date"
            }, {
                name: "隐藏域",
                icon: "el-icon-no-smoking"
            }, {
                name: "子表单",
                icon: "el-icon-s-order"
            }]
        },
        {
            tit: "增强字段", btn: [{
                name: "富文本",
                icon: "el-icon-files"
            }, {
                name: "数据字典",
                icon: "el-icon-wallet"
            }, {
                name: "自动编号",
                icon: "el-icon-money"
            }, {
                name: "上传附件",
                icon: "el-icon-upload"
            }, {
                name: "选择器",
                icon: "el-icon-thumb"
            }, {
                name: "对话框",
                icon: "el-icon-chat-line-square"
            }, {
                name: "关联数据",
                icon: "el-icon-set-up"
            }, {
                name: "地址",
                icon: "el-icon-location-information"
            }, {
                name: "签名",
                icon: "el-icon-edit-outline"
            },]
        },
        {
            tit: "系统字段", btn: [{
                name: "当前用户",
                icon: "el-icon-user"
            }, {
                name: "当前组织",
                icon: "el-icon-help"
            }, {
                name: "当前时间",
                icon: "el-icon-stopwatch"
            }, {
                name: "当前日期",
                icon: "el-icon-date"
            },]
        },
        {
            tit: "流程字段", btn: [{
                name: "流程实例",
                icon: "el-icon-s-operation"
            }, {
                name: "流程图",
                icon: "el-icon-s-marketing"
            }, {
                name: "审批历史",
                icon: "el-icon-s-management"
            }, {
                name: "审批意见",
                icon: "el-icon-s-check"
            }, {
                name: "流程关联",
                icon: "el-icon-guide"
            },]
        },
        {
            tit: "其它字段", btn: [{
                name: "描述",
                icon: "el-icon-question"
            }, {
                name: "选项卡",
                icon: "el-icon-s-grid"
            }, {
                name: "文本",
                icon: "el-icon-tickets"
            }, {
                name: "链接",
                icon: "el-icon-paperclip"
            }, {
                name: "分页",
                icon: "el-icon-notebook-2"
            }, {
                name: "折叠卡",
                icon: "el-icon-files"
            },]
        }
    ];

    export default {
        name: "fromDesign",
        data() {
            return {
                leftBtnData,
                moveDom: null,//要拖拽的元素
                tabsActiveName: "two",
                twoFormLabelAlign: {//表单属性
                    title: '表单名称',
                    key: '',
                    type: '',
                    desc: ""
                },
                twoFormLast: {
                    type: [],
                }
            }
        },
        methods: {
            leftBtnClick(ev){
                if (ev.target.tagName.toLowerCase() == "button" || ev.target.tagName.toLowerCase() == "span" ||ev.target.tagName.toLowerCase() == "i"){
                    let parent = $(ev.target).attr("data-parent");
                    let my = $(ev.target).attr("data-my");
                    if (!parent) {
                        parent = $(ev.target).parent().attr("data-parent");
                        my = $(ev.target).parent().attr("data-my");
                    }
                    let html = this.leftBtnData[parent].btn[my];
                    let append = $(".b-active");
                    if ($(".b-before").length){
                        append = $(".b-before");
                    }
                    $(".b-item").removeClass("b-active");
                    append.after(`
                            <div class="b-item b-active" draggable="true">
                            <h4>${html.name}</h4>
                            <div class="b-item-html">
                                ${html.html}
                            </div>
                            <div class="b-item-icon">
                                <button type="button" title="删除" class="el-button el-button--success is-plain is-circle el-button--mini box-del"><i class="el-icon-delete"></i></button>
                                <button type="button" title="复制" class="el-button el-button--success is-plain is-circle el-button--mini box-copy"><i class="el-icon-copy-document"></i></button>
                            </div>
                        </div>
                    `);
                    $(".b-before").remove();
                    this.tabsActiveName = "one";
                }
            },
            boxClick(ev){
                let name = ev.target.className;
                if (name){
                    if(name.indexOf("b-item") != -1){
                        $(".b-item").removeClass("b-active");
                        $(ev.target).addClass("b-active");
                    }else if (name.indexOf("box-del") != -1 || $(ev.target).parent().hasClass("box-del")){
                        $(ev.target).parents(".b-item").remove();
                    }else if (name.indexOf("box-copy") != -1 || $(ev.target).parent().hasClass("box-copy")){
                        //$(this).clone(true).insertAfter(this);
                        $(ev.target).parents(".b-item").removeClass("b-active").after($(ev.target).parents(".b-item").clone(true).addClass("b-active"));
                    }
                }

            },
            allowDrop(ev) {
                ev.preventDefault();
                let h = ev.target.offsetHeight;
                let y = ev.offsetY;
                if (ev.target.className && ev.target.className.indexOf("b-item") != -1) {
                    if (y <= h / 2){
                        y+=10;
                    }
                    if (y <= h / 2) {
                        if ($(ev.target).prev().attr("class") != "b-before") {
                            $(".b-before").remove();
                            $(ev.target).before("<div style='height: "+$(this.moveDom).height()+"px' class='b-before'></div>");
                        }
                    } else {
                        if ($(ev.target).next().attr("class") != "b-before") {
                            $(".b-before").remove();
                            $(ev.target).after("<div style='height: "+$(this.moveDom).height()+"px' class='b-before'></div>");
                        }
                    }
                    $(this.moveDom).hide();
                }
            },

            drag(ev) {
                if (ev.target.className && ev.target.className.indexOf("b-item") != -1) {
                    this.moveDom = ev.target;
                } else {
                    ev.dataTransfer.setData("html", ev.target.dataset.parent+","+ev.target.dataset.my);
                }
            },

            drop(ev) {
                ev.preventDefault();
                let index = ev.dataTransfer.getData("html").split(",");
                if (index.length > 1) {
                    let html = this.leftBtnData[index[0]].btn[index[1]];
                    $(".b-before").after(`
                            <div class="b-item" draggable="true">
                            <h4>${html.name}</h4>
                            <div class="b-item-html">
                                ${html.html}
                            </div>
                            <div class="b-item-icon">
                                <button type="button" title="删除" class="el-button el-button--success is-plain is-circle el-button--mini box-del"><i class="el-icon-delete"></i></button>
                                <button type="button" title="复制" class="el-button el-button--success is-plain is-circle el-button--mini box-copy"><i class="el-icon-copy-document"></i></button>
                            </div>
                        </div>
                    `);
                    $(".b-before").remove();
                    this.moveDom = null;
                }
            }
        },
        mounted(){
            const that = this;
            document.addEventListener("dragend",()=>{
                if(this.moveDom){
                    $(".b-before").after($(this.moveDom).show());
                    $(".b-before").remove();
                    that.moveDom = null;
                    that.tabsActiveName = "one";
                }
            });
            document.addEventListener("dragend",()=>{
                if ($(".b-item").length == 1){
                    $(".b-item").eq(0).addClass("b-active");
                }
                if($(".b-item").length){
                    //that.$set(that.$data, 'tabsActiveName', "one");
                    that.tabsActiveName = "one";
                    $(".b-before").remove();
                }
            });

        }
    }
</script>

<style lang="less" scoped>
    #formDesign {
        width: 100%;
        height: 100%;
        display: flex;
        flex-wrap: nowrap;

        .formDesign-left {
            width: 250px;
            height: 100%;
            overflow-y: auto;
            -webkit-touch-callout: none;
            -webkit-user-select: none;
            -khtml-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
        }
        .formDesign-center {
            flex: 1;
            min-width: 600px;
            height: 100%;

            .c-head {
                height: 38px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0 20px;
                background-color: #F5F7FA;
                border-bottom: 1px solid #E4E7ED;
                margin: 0;

                .c-card-name {
                    font-size: 16px;
                    color: #000;
                }
            }
        }
        .formDesign-right {
            width: 250px;
            height: 100%;
            overflow-y: auto;

            .el-tabs--border-card{
                min-height: 100%;
            }

            #pane-two,#pane-one{
                height: 100%;
                .el-form-item {
                    margin-bottom: 18px;
                }
            }
        }

        #c-box {
            -webkit-touch-callout: none;
            -webkit-user-select: none;
            -khtml-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
            overflow-y: auto;
            height: -moz-calc(100% - 39px);
            height: -webkit-calc(100% - 39px);
            height: calc(100% - 39px);
        }

        /*滚动条样式*/
        .formDesign-left::-webkit-scrollbar, #c-box::-webkit-scrollbar, .formDesign-right::-webkit-scrollbar {
            width: 4px;
            /*height: 4px;*/
        }
        .formDesign-left::-webkit-scrollbar-thumb,#c-box::-webkit-scrollbar-thumb, .formDesign-right::-webkit-scrollbar-thumb {
            border-radius: 10px;
            -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
            background: rgba(0, 0, 0, 0.2);
        }
        .formDesign-left::-webkit-scrollbar-track, #c-box::-webkit-scrollbar-track, .formDesign-right::-webkit-scrollbar-track {
            -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
            border-radius: 0;
            background: rgba(0, 0, 0, 0.1);

        }

        .card-tit {
            background-color: #F2F6FC;
            font-size: 14px;
            padding: 5px 10px;
            border-radius: 3px;
        }
        .card-content-btn {
            padding: 15px;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;

            .el-button--primary.is-plain {
                margin: 0;
                margin-bottom: 15px;
                width: 100px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                cursor: move;
            }
        }

    }
</style>
<style lang="less">
    #formDesign {
        #c-box {
            .b-before {
                border: 1px dashed #4DB8FF;
                height: 80px;
                line-height: 80px;
                text-align: center;
                color: #777777;
                cursor: pointer;
                font-size: 13px;
            }
            .b-item.b-active{
                border: 1px dashed #4DB8FF;
                background-color: rgba(77, 184, 255, 0.1);

                .b-item-icon{
                    display: flex;
                }
            }
            .b-item {
                min-height: 40px;
                padding: 5px 45px 15px 30px;
                position: relative;

                .b-item-icon{
                    width: 40px;
                    height: 100%;
                    position: absolute;
                    top: 0;
                    right: 0;
                    flex-wrap: wrap;
                    align-content: space-around;
                    justify-content: center;
                    display: none;

                    .el-button{
                        margin: 0;
                    }
                }

                h4 {
                    color: #666;
                    font-size: 14px;
                    padding: 5px 0;
                    font-weight: bold;
                    padding-bottom: 3px;
                    pointer-events: none;
                }

                .b-item-html {
                    pointer-events: none;
                }
            }
            .b-item:hover {
                background-color: rgba(64, 158, 255, .1);
            }
        }

        .el-input__inner {
            height: 32px;
            line-height: 32px;
            padding: 0 10px;
        }
        .el-form--label-top .el-form-item__label {
            line-height: 20px;
            padding: 0 0 3px;
        }
        .el-form-item__error{
            padding-top: 1px;
        }
        .el-textarea__inner{
            padding: 5px 10px;
        }
    }
</style>