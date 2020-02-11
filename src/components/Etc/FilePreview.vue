<template>
  <div class="box">
    <template v-if="hasNoFiles">
      <span>没有可供显示的文件</span>
    </template>
    <template v-else>
      <div class="pdfs">
        <div
          class="pdf-card"
          v-for="(pdf, index) in pdfs"
          :key="index"
          @click="pdfViewer(pdf)"
          :alt="pdf.name"
        >
          <span>PDF</span>
        </div>
      </div>
      <vue-picture-swipe
        :items="images"
        :options="pictureSwipeOption"
      ></vue-picture-swipe>
    </template>
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

export default Vue.extend({
  props: ["files"],
  components: {
    VuePictureSwipe
  },
  data() {
    return {
      hasNoFiles: false,
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
    if (typeof this.files === "undefined" || this.files === null) {
      this.hasNoFiles = true;
    } else {
      // 用于判断图片大小
      const img = new Image();
      // 处理输入
      let files: FileInfo[];
      if (typeof this.files === "string") {
        files = JSON.parse(this.files);
      } else {
        files = this.files;
      }

      files.forEach((file: FileInfo) => {
        if (file.type.slice(0, 5) === "image") {
          img.src = `/api/alien/preview/${file.uuid}/${file.name}`;
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
            src: `/api/alien/preview/${file.uuid}/${file.name}`
          });
        }
      });
    }
  }
});
</script>

<style lang="scss" scoped>
.box {
  border-radius: 1rem;
  background-color: #f1f0ef;
  width: 400px;
  padding: 15px 25px;
  box-sizing: border-box;
  text-align: center;

  & > .span {
    color: #4f4f4f;
  }

  .pdfs {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    .pdf-card {
      width: 100px;
      height: 100px;
      background-color: #fff;
      border: 1px solid #eee;

      box-shadow: rgba($color: red, $alpha: 0.55) 0px 0px 0px 10px inset;
      border-radius: 10px;
      margin: 4px 0px;

      display: flex;
      justify-content: center;
      align-items: center;

      cursor: pointer;

      // 如果最后一行是两个
      &:last-child:nth-child(3n-1) {
        margin-right: 124px;
      }

      // 如果最后一行是一个
      &:last-child:nth-child(3n-2) {
        margin-right: 248px;
      }

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

.my-gallery {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

figure[itemprop="associatedMedia"] {
  margin: 2px 0px;

  // 如果最后一行是两个
  &:last-child:nth-child(3n-1) {
    margin-right: 124px;
  }

  // 如果最后一行是一个
  &:last-child:nth-child(3n-2) {
    margin-right: 248px;
  }

  img[itemprop="thumbnail"] {
    border-radius: 10px;
    border: 1px solid #eee;
    margin: 0px;
  }
}
</style>
