<template>
  <div>
    <el-form ref="form" :model="contentForm" label-width="80px">
      <el-form-item label="状态">
        <el-radio-group v-model="contentForm.status">
          <!-- <el-radio :label="0">全部</el-radio> -->
          <el-radio :label="null">全部</el-radio>
          <el-radio :label="0">草稿</el-radio>
          <el-radio :label="1">待审核</el-radio>
          <el-radio :label="2">审核通过</el-radio>
          <el-radio :label="3">审核失败</el-radio>
          <el-radio :label="4">已删除</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="频道">
        <el-select v-model="contentForm.channel_id" placeholder="请选择">
          <el-option
            v-for="item in channelsList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="日期" prop="name">
        <el-date-picker
          v-model="time"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd"
        >>
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getArticlesDataApi()">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="articlesList"
      border
      style="width: 100%"
      size="mini"
    >
      <el-table-column
        prop="date"
        label="封面"
        width="180"
      >
        <template slot-scope="scope">
          <img
            v-if="scope.row.cover.images[0]"
            style="width: 100px; height: 100px"
            :src="scope.row.cover.images[0]"
            object-fit="cover"
          >
          <img
            v-else
            style="width: 80px; height: 80px"
            src="../../assets/404_images/暂无图片.png"
            object-fit="cover"
          >
        </template>
      </el-table-column>
      <el-table-column
        prop="title"
        label="标题"
        width="180"
      />
      <el-table-column
        prop="address"
        label="状态"
      >
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status == 0" type="success">草稿</el-tag>
          <el-tag v-else-if="scope.row.status == 1">待审核</el-tag>
          <el-tag v-else-if="scope.row.status == 2">审核通过</el-tag>
          <el-tag v-else-if="scope.row.status == 3">审核失败</el-tag>
          <el-tag v-else-if="scope.row.status == 4">已删除</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="pubdate"
        label="发布时间"
      />
      <el-table-column
        prop="address"
        label="操作"
      >
        <template>
          <el-button type="primary" icon="el-icon-edit" circle />
          <el-button type="danger" icon="el-icon-delete" circle />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getChannelsData, getArticlesData } from '@/api/articles'
export default {
  name: 'ContentManagement',
  data() {
    return {
      time: null,
      contentForm: {
        status: null,
        channel_id: null,
        page: 1,
        per_page: 20
      },
      articlesList: [],
      channelsList: []
    }
  },
  created() {
    this.getArticlesDataApi()
    this.getgetChannelsDataApi()
  },
  methods: {
    async getArticlesDataApi() {
      try {
        const res = await getArticlesData({
          status: this.contentForm.status,
          channel_id: this.contentForm.channel_id,
          page: this.contentForm.page,
          per_page: this.contentForm.per_page,
          begin_pubdate: this.time ? this.time[0] : null,
          end_pubdate: this.time ? this.time[1] : null
        })
        if (res.status === 200) {
          this.articlesList = res.data.data.results
        }
        console.log(res)
      } catch (error) {
        console.log(error)
      }
    },
    async getgetChannelsDataApi() {
      try {
        const { data } = await getChannelsData({
          mobile: 13911111111,
          code: 246810
        })
        this.channelsList = data.data.channels
        this.channelsList.unshift({
          id: null,
          name: '全部'
        })
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>
