<template>
  <ul class="list-group">
    <VideoListItem 
      v-for="video in videos" 
      :key="video.id.videoId"
      :video="video"
      @selectVideo="onSelectVideo"> <!-- selectVideo 이벤트가 발생하면 onSelectVideo 실행된다. -->
    </VideoListItem>
  </ul>
</template>

<script>
import VideoListItem from './VideoListItem'

export default {
  name: 'VideoList',
  props: {
    videos: {
      type: Array,
      required: true,
    }
  },
  components: {
    VideoListItem,
  },
  methods: {
    // videoSelect 라는 이벤트를 발생시킨다!
    onSelectVideo: function(video) {
      this.$emit('selectVideo', video)
    }
  }
}
</script>

<style>

</style>