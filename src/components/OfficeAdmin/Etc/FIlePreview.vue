/*
 * @Author: Skye Young 
 * @Date: 2019-12-01 22:12:46 
 * @Last Modified by: Skye Young
 * @Last Modified time: 2019-12-02 22:23:00
 */

<template>
  <div class="box">
    <vue-picture-swipe :items="images" :options="pictureSwipeOption"></vue-picture-swipe>
    <span class="pdf-card" v-for="(pdf,index) in pdfs" :key="index" @click="pdfViewer(pdf)">
      <div>
        <span>PDF</span>
      </div>
    </span>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import VuePictureSwipe from "vue-picture-swipe";

interface FileInfo {
  name: string;
  uuid: string;
  type: string;
}

const panurl = "http://test.iskye.cn";

export default Vue.extend({
  props: ["files"],
  components: {
    VuePictureSwipe
  },
  data() {
    return {
      images: [],
      pdfs: [],
      pictureSwipeOption: {
        shareButtons: [
          {
            id: "downloadImage",
            label: "下载图片",
            url: "{{raw_image_url}}",
            download: true
          }
        ]
      }
    };
  },
  methods: {
    pdfViewer(pdf: { name: string; src: string }) {
      // this.$alert(`<iframe src="${pdf}"></iframe>`, "", {
      //   dangerouslyUseHTMLString: true
      // });
      this.$msgbox({
        title: pdf.name,
        message: `<iframe class="content" src="${pdf.src}"></iframe>`,
        dangerouslyUseHTMLString: true,
        showConfirmButton: false,
        customClass: "pdf-viewer"
      });
    }
  },
  created() {
    // 用于判断图片大小
    const img = new Image();

    this.files.forEach((file: FileInfo) => {
      if (file.type.slice(0, 5) === "image") {
        img.src = `${panurl}/api/alien/preview/${file.uuid}/${file.name}`;
        (this.images as any).push({
          src: img.src,
          thumbnail: `${img.src}?ir=fill_100_100`,
          w: img.naturalWidth,
          h: img.naturalHeight,
          alt: img.name
        });
      } else if (file.type.slice(-3) === "pdf") {
        (this.pdfs as any).push({
          name: file.name,
          src: `${panurl}/api/alien/preview/${file.uuid}/${file.name}`
        });
      }
    });
  }
});
</script>

<style lang="scss" scoped>
.box {
  border-radius: 1rem;
  background-color: #ffffff;
  box-shadow: 0 8px 10px -5px rgba(0, 0, 0, 0.2);

  .pdf-card {
    display: inline-block;

    div {
      width: 100px;
      height: 100px;
      background-color: #ffffff;
      box-shadow: #f8f9fa 0px 0px 0px 10px inset;
      border-radius: 10px;
      margin: 6px;

      display: flex;
      justify-content: center;
      align-items: center;

      span {
        color: red;
        opacity: 0.6;
        font-weight: 800;
        text-align: center;
      }
    }
  }
}
</style>

<style lang="scss">
.pdf-viewer {
  width: 95%;
  height: 95%;

  & > .el-message-box__content {
    height: calc(100% - 20px);

    & > .el-message-box__message {
      height: inherit;

      & > p {
        height: inherit;
      }
    }
  }

  .content {
    width: 100%;
    height: 100%;
    border: 1px solid #eee;
  }
}

img[itemprop="thumbnail"] {
  border-radius: 10px;
  border: 1px solid #eee;
}
</style>