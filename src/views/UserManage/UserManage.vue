<template>
  <div class="home">
    <div class="search">
      <el-form :inline="true" :rules="rules" ref="searchStaffForm" label-position=right label-width="85px" :model="search">
        <el-form-item label="姓名" prop="name">
          <el-input style="width: 250px" v-model="search.name"></el-input>
        </el-form-item>
        <el-form-item label="账号" prop="account">
          <el-input style="width: 250px" v-model="search.account"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="search.sex" placeholder="请选择" clearable>
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出生日期" prop="birthdayStart">
          <el-date-picker
              v-model="search.birthdayStart"
              type="date"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              placeholder="开始日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="至" prop="birthdayEnd" style="margin-left: -60px">
          <el-date-picker
              v-model="search.birthdayEnd"
              type="date"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchClick">查询</el-button>
          <el-button type="primary" plain @click="resetForm('searchStaffForm')">重置</el-button>
          <el-button @click="returnForm('searchStaffForm')">返回</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="container">
      <el-table
          :data="staffDate.slice((currentPage-1)*pagesize,currentPage*pagesize)"
          stripe
          :default-sort="{prop: 'account', order: 'ascending'}">
        :data=departmentDate
        style="width: 100%">
        <el-table-column label="序号" type="index" width="80px"></el-table-column>
        <el-table-column label="账号" prop="account" width="100px" sortable></el-table-column>
        <el-table-column label="姓名" prop="name" sortable></el-table-column>
        <el-table-column label="性别" prop="sex"></el-table-column>
        <el-table-column label="年龄" prop="age" sortable></el-table-column>
        <el-table-column label="出生日期" prop="birthday" sortable></el-table-column>
        <el-table-column label="所属部门" prop="d_name"></el-table-column>
        <el-table-column align="right">
          <template slot="header">
            <el-button style="width: 70px;" size="mini" type="primary" @click="addStaff">添加</el-button>
            <el-button style="width: 70px;" size="mini" plain type="primary" @click="downLoad">导出</el-button>
          </template>
          <template slot-scope="scope">
            <el-button size="mini" @click="staffEdit(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="staffDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="pagesize"
          layout="total, prev, pager, next, jumper"
          :total="staffDate.length"
          align="center"
          background
          style="margin-top: 20px">
      </el-pagination>

      <el-dialog title="修改信息" :visible.sync="dialogFormVisible">
        <el-form :inline="true" :model="editForm" :rules="rules" label-width="100px">
          <el-form-item label="账号" prop="account">
            <el-input v-model="editForm.account" style="width: 200px" disabled></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="editForm.password" show-password style="width: 250px"></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="name">
            <el-input v-model="editForm.name" style="width: 200px"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-select v-model="editForm.sex" placeholder="请选择" style="width: 250px" disabled>
              <el-option label="男" value="男" style="width: 200px"></el-option>
              <el-option label="女" value="女" style="width: 200px"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="年龄" prop="age">
            <el-input v-model="editForm.age" style="width: 200px" :readonly="true"></el-input>
          </el-form-item>
          <el-form-item label="出生日期" prop="birthday">
            <el-col :span="11">
              <el-form-item prop="birthday">
                <el-date-picker
                    type="date" placeholder="选择日期"
                    v-model="editForm.birthday" style="width: 250px"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    @input="birthdayChange">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label="所属部门" prop="d_name">
            <el-select v-model="editForm.d_name" placeholder="请选择部门" style="width: 200px">
              <el-option v-for="item in departmentDate" :key="item.d_id" :label="item.d_name" :value="item.d_name">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div class="dialog-footer">
          <el-button type="primary" @click="confirmEdit">确 定</el-button>
          <el-button @click="dialogFormVisible = false">取 消</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  // import {axiosRequest} from "@/network/request";

  export default {
    name: "UserManage",
    data() {
      return {
        editForm:{
          account:'',
          password:'',
          name:'',
          sex:'',
          age:'',
          birthday:'',
          d_name:''
        },
        dialogFormVisible:false,
        search: {
          name: '',
          account:'',
          sex: '',
          birthdayStart: '',
          birthdayEnd:''
        },
        departmentDate:[],
        staffDate:[
          {
            account:'11',
            name:'11',
            sex:'11',
            age:'11',
            birthday:'11',
            d_name:'11'
          }
        ],
        currentPage:1,
        pagesize:5,
        rules: {
          name: [
            { pattern: /^[\u4E00-\u9FA5]+$/, message: '姓名只能为中文'}
          ],
          password: [
            { min:6, message: '密码长度至少为6位'}
          ]
        }
      }
    },
    created(){
      this.getStaffDate()
      this.getDepartmentDate()
    },
    methods: {
      // getDepartmentDate(){
      //   axiosRequest({
      //     method: 'get',
      //     url: '/getDepartmentDate',
      //   }).then(successResponse => {
      //     this.departmentDate = successResponse.data
      //   })
      // },
      // getStaffDate(){
      //   axiosRequest({
      //     method: 'get',
      //     url: '/getStaffDate'
      //   }).then(successResponse => {
      //     this.staffDate = successResponse.data
      //   })
      // },
      birthdayChange(){
        this.editForm.age = new Date().getFullYear() - this.editForm.birthday.split('-')[0]
            - (new Date().getMonth() < this.editForm.birthday.split('-')[1] ||
            (new Date().getMonth() == this.editForm.birthday.split('-')[2] &&
                new Date().getDate() < this.editForm.birthday.split('-')[2]) ? 1 : 0)
      },
      handleSizeChange(size){
        this.pagesize = size
      },
      handleCurrentChange(currentPage){
        this.currentPage = currentPage
      },
      // searchClick() {
      //   axiosRequest({
      //     method:'post',
      //     url:'/searchStaff',
      //     data:{
      //       name:this.search.name,
      //       account:this.search.account,
      //       sex:this.search.sex,
      //       birthdayStart:this.search.birthdayStart,
      //       birthdayEnd:this.search.birthdayEnd,
      //     }
      //   }).then(successResponse => {
      //     this.staffDate = successResponse.data
      //   })
      // },
      resetForm(form){
        // this.searchClick()
        this.$refs[form].resetFields();
      },
      returnForm(form){
        this.$refs[form].resetFields();
        // this.searchClick()
      },
      addStaff(){
        this.$router.replace({path:'/add'})
      },
      // downLoad(){
      //   axiosRequest({
      //     method:'post',
      //     url:'/downloadStaff',
      //     responseType: 'blob',
      //     data:{
      //       name:this.search.name,
      //       account:this.search.account,
      //       sex:this.search.sex,
      //       birthdayStart:this.search.birthdayStart,
      //       birthdayEnd:this.search.birthdayEnd,
      //     }
      //   }).then(successResponse => {
      //     const content = successResponse.data
      //     const blob = new Blob([content])
      //     let date = new Date()
      //     let time = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()
      //     const fileName = '员工信息('+time+').csv'
      //     if ('download' in document.createElement('a')) { // 非IE下载
      //       const elink = document.createElement('a')
      //       elink.download = fileName
      //       elink.style.display = 'none'
      //       elink.href = URL.createObjectURL(blob)
      //       document.body.appendChild(elink)
      //       elink.click()
      //       URL.revokeObjectURL(elink.href) // 释放URL 对象
      //       document.body.removeChild(elink)
      //     } else { // IE10+下载
      //       navigator.msSaveBlob(blob, fileName)
      //     }
      //   })
      // },
      // staffEdit(row){
      //   axiosRequest({
      //     method:'get',
      //     url:'/findStaffDetails',
      //     params:{
      //       account:row.account
      //     }
      //   }).then(successResponse => {
      //     this.dialogFormVisible = true
      //     this.editForm = successResponse.data
      //   })
      // },
      // confirmEdit(){
      //   let date = new Date()
      //   let dateString = date.toLocaleDateString().split('/')
      //   let dateStr = dateString[0]+'-'+(dateString[1]>=10?dateString[1]:'0'+dateString[1])+'-'+
      //       (dateString[2]>=10?dateString[2]:'0'+dateString[2])+' '+(date.getHours()>=10?date.getHours():'0'+date.getHours())+':'+
      //       (date.getMinutes()>=10?date.getMinutes():'0'+date.getMinutes())+':'+
      //       (date.getSeconds()>=10?date.getSeconds():'0'+date.getSeconds())
      //   axiosRequest({
      //     method:'post',
      //     url:'/updateStaff',
      //     data:{
      //       password:this.editForm.password,
      //       name:this.editForm.name,
      //       age:this.editForm.age,
      //       birthday:this.editForm.birthday,
      //       d_name:this.editForm.d_name,
      //       update_time:dateStr,
      //       account:this.editForm.account
      //     }
      //   }).then(successResponse => {
      //     if (successResponse.data == 200){
      //       this.dialogFormVisible = false
      //       this.getStaffDate()
      //       this.$message({
      //         showClose: true,
      //         message: '修改成功！',
      //         type: 'success'
      //       })
      //     }
      //   })
      // },
      // staffDelete(index, row){
      //   this.$confirm('是否删除员工【'+row.name+'】的相关信息?', '提示', {
      //     confirmButtonText: '确定',
      //     cancelButtonText: '取消',
      //     type: 'warning'
      //   }).then(() => {
      //     axiosRequest({
      //       method:'post',
      //       url:'/deleteStaff',
      //       data:{
      //         account:row.account
      //       }
      //     }).then(successResponse => {
      //       if (successResponse.data == 200){
      //         this.staffDate.splice(index,1)
      //         this.$message({
      //           type: 'success',
      //           message: '删除成功!'
      //         })
      //       }
      //     })
      //   }).catch(() => {
      //     this.$message({
      //       type: 'info',
      //       message: '已取消'
      //     });
      //   })
      // },
    }
  }
</script>

<style scoped>
  .home {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .search {
    margin-top: 2%;
    padding: 20px 0;
    width: 80%;
    display: flex;
    align-items: center;
    box-shadow: 0 0 5px #c6c6c6;
  }

  .container {
    width: 80%;
    margin-top: 10px;
    padding: 10px 0;
    box-shadow: 0 0 5px #c6c6c6;
  }

</style>