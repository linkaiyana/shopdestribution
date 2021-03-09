<template>
  <div class="upload">
    <div class="img-list">
      <div class="img" :class="{smallImg: size==='small', middleImg: size === 'middle', largeImg: size === 'large'}" v-for="(item,index) in base64List" :key="item.id">
        <div class="wrap">
          <img class="showimg" :src="item.result" alt="" @click="previewImg(index)">
        </div>
        <img class="delete-icon" src="~@/assets/imgs/delete.png" alt="" @click="deleteImg(index)">
      </div>
      <label v-if="base64List.length < num" :class="{smallImg: size==='small', middleImg: size === 'middle', largeImg: size === 'large'}" :for="'file'+i">
        <div class="show-box" :class="{small: size==='small', middle: size === 'middle', large: size === 'large'}"></div>
      </label>
    </div>
    <input type="file" name="file" :id="'file'+i" :multiple="multiple" v-show="false" accept=".jpg, .jpeg, .png" @change="addImage">
  </div>
</template>

<script>
// import { UploadFile } from '@/views/home/api';
import { Dialog, ImagePreview } from 'vant';

export default {
  name: 'index',
  props: {
    // 组件尺寸
    size: {
      type: String,
      default: 'large',
    },
    // 是否可多选
    multiple: {
      type: Boolean,
      default: true,
    },
    i: {
      type: Number,
      default: 1,
    },
    // 上传数据
    list: {
      type: Array,
      default: () => [],
    },
    // 可上传数量
    num: {
      type: Number,
      default: 5,
    },
  },
  data() {
    return {
      imgsList: [],
      base64List: [],
    };
  },
  methods: {
    // 图片转base64显示
    imgToBase64(file) {
      // const files = [...file.target.files];
      // if (files.length + this.base64List.length > this.num) {
      //   files.splice(this.num - this.base64List.length);
      // }
      file.forEach((item) => {
        const base64data = new FileReader();
        base64data.readAsDataURL(item);
        base64data.onload = () => {
          const { result } = base64data;
          this.base64List.push({
            id: item.lastModified,
            result,
            name: item.name,
          });
          this.imgsList.push(result);
        };
      });
    },
    addImage(file) {
      if (file.target.files.length === 0) {
        return;
      }
      const files = [...file.target.files];
      // 新图片
      const newfiles = [];
      files.forEach((item) => {
        let isExist = false;
        this.base64List.forEach((subItem) => {
          if (item.name === subItem.name) {
            isExist = true;
          }
        });
        if (!isExist) {
          newfiles.push(item);
        }
      });
      if (newfiles.length + this.base64List.length > this.num) {
        newfiles.splice(this.num - this.base64List.length);
      }
      this.imgToBase64(newfiles);
      let data;
      if (this.list.length === 0) {
        data = new FormData();
        this.list.push(data);
      } else {
        // eslint-disable-next-line prefer-destructuring
        data = this.list[0];
      }
      // data.append('file', newfiles);
      // this.list.push(data);

      newfiles.forEach((item) => {
        data.append('file', item, item.name);
      });

      this.$emit('upload');
      // console.log(this.list[0]);
      // UploadFile(this.list[0]).then((res) => {
      //   console.log(res);
      // });
    },
    deleteImg(index) {
      Dialog.confirm({
        title: '确定要删除这张图片吗',
        message: '提示',
      }).then(() => {
        this.base64List.splice(index, 1);
        const files = this.list[0].getAll('file');
        console.log(this.list);
        this.list[0].delete('file');
        files.forEach((item, i) => {
          if (i !== index) {
            this.list[0].append('file', item);
          }
        });
        this.list[0].getAll('file').splice(index, 1);
        if (this.list[0].getAll('file').length <= 0) {
          this.list.shift();
        }
        console.log(this.list[0].getAll('file'));
      }).catch(() => {
      });
      console.log(this.list[0].getAll('file'));
    },
    previewImg(index) {
      ImagePreview({
        images: this.imgsList,
        closeable: true,
        startPosition: index,
      });
    },
  },
};
</script>
<style lang="less" scoped>

.img-list {
  display: flex;
  flex-wrap: wrap;
  > .img {
    position: relative;
    &.smallImg {
      width: 50px;
      height: 50px;
      margin-right: 3px;
      .wrap {
        border-radius: 10px;
      }
      > .delete-icon {
        right: -3px;
        top: -3px;
        width: 13px;
        height: 13px;
      }
    }
    &.middleImg {
      width: 75px;
      height: 75px;
      margin-right: 5px;
      .wrap {
        border-radius: 15px;
      }
      > .delete-icon {
        right: -5px;
        top: -5px;
        width: 15px;
        height: 15px;
      }
    }
    &.largeImg {
      width: 100px;
      height: 100px;
      margin-right: 10px;
      .wrap {
        border-radius: 20px;
      }
      > .delete-icon {
        right: -7px;
        top: -7px;
        width: 20px;
        height: 20px;
      }
    }
  }
}

.smallImg, .middleImg, .largeImg {
  > .wrap {
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
    align-items: center;
    > .showimg {
      width: 100%;
    }
  }
  > .delete-icon {
    position: absolute;
  }
}
.show-box {
  &.small, &.middle, &.large {
    position: relative;
    background: rgb(241, 239, 239);
    border: 3px dotted #e7e3e3;
    &::before, &::after {
      content: '';
      display: block;
      background: #e0dcdc;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto;
    }
  }
  &.small {
    width: 50px;
    height: 50px;
    border-radius: 10px;
    border: 3px dotted #e7e3e3;
    &::before {
      width: 30px;
      height: 1px;
      border-radius: 1px;
    }
    &::after {
      width: 1px;
      height: 30px;
      border-radius: 1px;
    }
  }
  &.middle {
    width: 75px;
    height: 75px;
    border-radius: 15px;
    border: 5px dotted #e7e3e3;
    &::before {
      width: 40px;
      height: 2px;
      border-radius: 1px;
    }
    &::after {
      width: 2px;
      height: 40px;
      border-radius: 1px;
    }
  }
  &.large {
    width: 100px;
    height: 100px;
    border-radius: 20px;
    border: 5px dotted #e7e3e3;
    &::before {
      width: 50px;
      height: 3px;
      border-radius: 2px;
    }
    &::after {
      width: 3px;
      height: 50px;
      border-radius: 2px;
    }
  }
}
</style>
