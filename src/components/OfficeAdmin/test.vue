<template>
  <div>
    <file-preview :files="files"></file-preview>
    <download-as-zip :files="filesNeedZip" :zip-name="schoolYear+'年度'" :can-download="true">测试下载</download-as-zip>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import FilePreview from "@/components/Etc/FilePreview.vue";
import DownloadAsZip from "@/components/Etc/DownloadAsZip.vue";

interface FileInfo {
  name: string;
  uuid: string;
  type: string;
}

interface FileNeedZip {
  name: string;
  files: FileInfo[];
}

export default Vue.extend({
  components: {
    FilePreview,
    DownloadAsZip
  },
  data() {
    return {
      schoolYear: "2017-2018",
      files: [
        {
          name: "3.pdf",
          uuid: "dca99dd0-1119-41ef-6c95-51e94a5c4e4e",
          type: "application/pdf"
        },
        {
          name: "picture (49).jpg",
          uuid: "442cd70f-28ad-440e-45d9-eaa8972f937d",
          type: "image/jpg"
        },
        {
          name: "picture (2).jpg",
          uuid: "54020c47-2918-42d8-465e-287e0390725e",
          type: "image/jpg"
        },
        {
          name: "1.pdf",
          uuid: "85f82054-b806-4ffc-6e6f-d256bc01d191",
          type: "application/pdf"
        },
        {
          name: "picture (52).jpg",
          uuid: "968cda25-f344-4ec8-67ba-c81eeab847b5",
          type: "image/jpg"
        },
        {
          name: "picture (51).jpg",
          uuid: "e764cbd1-4c99-4fc2-4c24-56e61a8adada",
          type: "image/jpg"
        },
        {
          name: "picture (33).jpg",
          uuid: "0b3fb94a-b29a-4559-40b9-9afa8a3b8b72",
          type: "image/jpg"
        },
        {
          name: "2.pdf",
          uuid: "92589b30-622c-4e9f-7bbb-cd5028d908a0",
          type: "application/pdf"
        }
      ],
      filesNeedZip: [
        {
          name: "1",
          files: [
            {
              name: "3.pdf",
              uuid: "dca99dd0-1119-41ef-6c95-51e94a5c4e4e",
              type: "application/pdf"
            },
            {
              name: "picture (49).jpg",
              uuid: "442cd70f-28ad-440e-45d9-eaa8972f937d",
              type: "image/jpg"
            },
            {
              name: "picture (2).jpg",
              uuid: "54020c47-2918-42d8-465e-287e0390725e",
              type: "image/jpg"
            }
          ]
        },
        {
          name: "2",
          files: [
            {
              name: "1.pdf",
              uuid: "85f82054-b806-4ffc-6e6f-d256bc01d191",
              type: "application/pdf"
            },
            {
              name: "picture (52).jpg",
              uuid: "968cda25-f344-4ec8-67ba-c81eeab847b5",
              type: "image/jpg"
            },
            {
              name: "picture (51).jpg",
              uuid: "e764cbd1-4c99-4fc2-4c24-56e61a8adada",
              type: "image/jpg"
            }
          ]
        }
      ]
    };
  }
});
</script>

<style lang="scss" scoped>
</style>