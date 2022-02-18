<template>
    <el-row class="home" :gutter="20">
    <el-col :span="8" style="margin-top: 20px">
        <!--shadow属性设置卡片阴影出现的时机-->
        <el-card shadow='hover'>
            <div class="user">
                <img :src="userImg"/>
                <div class="userinfo">
                    <p class="name">{{$store.state.userName}}</p>
                    <p class="access">超级管理员</p>
                </div>
            </div>
            <div class="login-info">
                <p>上次登录时间：<span>{{$store.state.dateTime}}</span></p>
                <p>上次登录地点：<span>成都</span></p>
            </div>
        </el-card>
        <el-card style="height: 320px ; margin-top: 20px">
            <el-table :data="tableData">
                <el-table-column show-overflow-tooltip v-for="(val, key) in tableLabel" :key="key" :prop="key"
                                 :label="val"></el-table-column>
            </el-table>
        </el-card>
    </el-col>
        <el-col :span="16" style="margin-top: 20px">
            <div class="num">
                <el-card shadow="hover" v-for="item in countData" :key="item.name" :body-style="{ display: 'flex', padding: 0}">
                    <i class="icon" :class="`el-icon-${item.icon}`" :style="{ background: item.color }"></i>
                    <div class="detail">
                        <p class="num">￥ {{ item.value }}</p>
                        <p class="txt">{{ item.name }}</p>
                    </div>
                </el-card>
            </div>
            <el-card shadow="hover" style="height: 200px">
                11
            </el-card>
            <div class="graph">
                <el-card shadow="hover" style="height: 205px">
                    22
                </el-card>
                <el-card shadow="hover" style="height: 205px">
                    33
                </el-card>
            </div>
        </el-col>
    </el-row>
</template>

<script>
    export default {
        data() {
            return {
                userImg: require('../../assets/images/user.png'),
                countData: [
                    {
                        name: '今日支付订单',
                        value: 1234,
                        icon: 'success',
                        color: '#2ec7c9'
                    },
                    {
                        name: '今日收藏订单',
                        value: 210,
                        icon: 'star-on',
                        color: '#ffb980'
                    },
                    {
                        name: '今日未支付订单',
                        value: 1234,
                        icon: 's-goods',
                        color: '#5ab1ef'
                    },
                    {
                        name: '本月支付订单',
                        value: 1234,
                        icon: 'success',
                        color: '#2ec7c9'
                    },
                    {
                        name: '本月收藏订单',
                        value: 210,
                        icon: 'star-on',
                        color: '#ffb980'
                    },
                    {
                        name: '本月未支付订单',
                        value: 1234,
                        icon: 's-goods',
                        color: '#5ab1ef'
                    }
                ],
                tableData: [],
                tableLabel: {
                    name: '课程',
                    todayBuy: '今日购买',
                    monthBuy: '本月购买',
                    totalBuy: '总购买'
                }
            }
        },
        methods: {
            getTableData() {
                this.$http.get('/home/getData').then(res => {
                    res = res.data
                    this.tableData = res.data.tableData
                })
            }
        },
        //获取首页数据
        created() {
            this.getTableData()
        }

    }


</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/home';
</style>
