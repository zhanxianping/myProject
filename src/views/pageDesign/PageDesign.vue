<template>
    <div id="pageDesign">
        <el-container>
            <el-header>
                <label class="el-form-item__label" style="width: 80px;">表单搜索</label>
                <div class="el-form-item__content" style="margin-left: 80px;">
                    <div class="el-input" style="width: 320px;margin-right: 20px">
                        <input type="text" autocomplete="off" class="el-input__inner">
                    </div>
                    <el-button type="primary" icon="el-icon-search">搜索</el-button>
                    <el-button type="primary" icon="el-icon-sell">导入</el-button>
                    <el-button type="primary" icon="el-icon-sold-out">导出</el-button>
                </div>
            </el-header>
            <el-container>
                <el-aside class="left-tree">
                    <el-tree :data="tree" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
                </el-aside>
                <el-main>
                    <div class="main-content" @click="everyContent($event)">
                        <div class="right-everyContent" style="line-height: 230px;cursor: pointer">
                            <p><i class="el-icon-document-add"></i>&nbsp;创建表单</p>
                        </div>
                        <div v-for="(index, item) in 10" :key="index" class="right-everyContent">
                            <h4>表单设计</h4>
                            <img src="../../../public/image/user/hpic0.jpg" alt="表单设计">
                            <div class="last-fn">
                                <el-dropdown trigger="click" @command="handleCommand">
                                      <span class="el-dropdown-link">
                                        <i class="el-icon-setting"></i>
                                      </span>
                                    <el-dropdown-menu slot="dropdown">
                                        <el-dropdown-item command="view" icon="el-icon-view">预览</el-dropdown-item>
                                        <el-dropdown-item command="edit" icon="el-icon-edit">编辑</el-dropdown-item>
                                        <el-dropdown-item command="delete" icon="el-icon-delete">删除</el-dropdown-item>
                                        <el-dropdown-item command="copy" icon="el-icon-document-copy">复制</el-dropdown-item>
                                        <el-dropdown-item command="coordinate" divided icon="el-icon-coordinate">表单权限</el-dropdown-item>
                                        <el-dropdown-item command="printer" icon="el-icon-printer">打印模板</el-dropdown-item>
                                    </el-dropdown-menu>
                                </el-dropdown>
                            </div>
                        </div>

                    </div>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    import $ from "jquery";
    export default {
        name: "PageDesign",
        data() {
            return {
                tree: [{
                    id: 1,
                    label: '一级 1',
                    children: [{
                        id: 4,
                        label: '二级 1-1',
                        children: [{
                            id: 9,
                            label: '三级 1-1-1'
                        }, {
                            id: 10,
                            label: '三级 1-1-2'
                        }]
                    }]
                }, {
                    id: 2,
                    label: '一级 2',
                    children: [{
                        id: 5,
                        label: '二级 2-1'
                    }, {
                        id: 6,
                        label: '二级 2-2'
                    }]
                }, {
                    id: 3,
                    label: '一级 3',
                    children: [{
                        id: 7,
                        label: '二级 3-1'
                    }, {
                        id: 8,
                        label: '二级 3-2'
                    }]
                }],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                }
            };
        },
        methods: {
            handleNodeClick(data){
                console.log(data);
            },
            everyContent(e) {
                if (e.target.className == "right-everyContent") {
                    console.log(this.className);
                }
            },
            handleCommand(command) {
                this.$message('点击了 ' + command);
            }
        }
    }
</script>

<style lang="less" scoped>
    #pageDesign {
        width: 100%;
        height: 100%;

        * {
            box-sizing: border-box;
        }

        .el-container.is-vertical {
            width: 100%;
            height: 100%;
        }

        .left-tree {
            width: 320px;
            border-right: 1px solid #dcdcdc;
        }

        .el-main > .main-content {
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-start;
            height: 100%;
        }

        .right-everyContent {
            width: 220px;
            height: 250px;
            padding: 10px 15px;
            text-align: center;
            border: 1px solid #dcdcdc;
            border-radius: 3px;
            margin-bottom: 30px;
            margin-right: 30px;
            h4 {
                text-align: left;
            }

            img {
                width: 100px;
                height: 100px;
                border-right: 5px;
                margin-top: 40px;
            }
            .last-fn {
                text-align: right;
                margin-top: 40px;
                i {
                    font-size: 20px;
                    cursor: pointer;
                }
            }
        }
    }
</style>