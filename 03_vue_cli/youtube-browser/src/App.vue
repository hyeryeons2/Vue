<template>
  <div class="container">
    <!-- step no.3 -->
    <SearchBar @inputChange="onInputChange"/>
    <VideoDetail :video="selectedVideo"/>
    <VideoList @selectVideo="onSelectVideo" :videos="videos"/>
  </div>
</template>

<script>
import axios from 'axios'

// step no.1
import SearchBar from './components/SearchBar'
import VideoList from './components/VideoList'
import VideoDetail from './components/VideoDetail'

const API_KEY = process.env.VUE_APP_YOUTUBE_API_KEY // YOUTUBE
const API_URL = 'https://www.googleapis.com/youtube/v3/search'

// Vue
export default {
  name: 'App', // Component 의 이름을 지정
  // step no.2
  data() {
    return {
      videos: [],
      selectedVideo: null,
    }
  },
  components: {
    SearchBar,
    VideoList,
    VideoDetail,
  },
  methods: {
    // inputChage 라는 이벤트가 발생할 때 마다 실행해라!
    onInputChange: function(inputValue) {
      axios.get(API_URL, {
        params: {
          key: API_KEY,
          type: 'video',
          part: 'snippet',
          q: inputValue,
        }
      })
      .then(response => {
        this.videos = response.data.items
      })
      .catch(error => {
        console.error(error)
      })
    },
    onSelectVideo: function(video) {
      this.selectedVideo = video
    }
  }
}
</script>

<style>

</style>