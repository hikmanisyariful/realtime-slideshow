<template>
  <div class="home">
    <div>
      <img :src="image[number]">
    </div>
    <div>
      {{ number }}
      <button @click="previous">PREVIOUS</button>
      <button @click="next">NEXT</button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import io from 'socket.io-client'

export default {
  name: 'Home',
  data () {
    return {
      number: 0,
      image: [
        'https://cdn.water-sport-bali.com/wp-content/uploads/2012/03/Wisata-Alam-Bali-Yang-Manarik-Dikunjungi-Facebook.jpg',
        'https://www.pesonaindo.com/wp-content/uploads/2015/11/Foto-Tempat-Wisata-Alam-di-Jawa-Pesona-Indonesia-fototrip-3-1025x530.jpg',
        'https://asset.kompas.com/crop/3x2:780x520/750x500/data/photo/2019/03/19/1621834831.jpg',
        'https://merahputih.com/media/70/bd/44/70bd44e43e4ef3398843955943fce1d1.jpg'
      ],
      socket: io.connect('http://localhost:3000/')
    }
  },
  methods: {
    previous () {
      this.number--
      if (this.number === -1) {
        this.number = this.image.length - 1
      }
      this.socket.emit('currentNumber', this.number)
    },
    next () {
      this.number++
      if (this.number === this.image.length) {
        this.number = 0
      }
      this.socket.emit('currentNumber', this.number)
    }
  },
  created () {
    this.socket.on('nowNumber', (nowNumber) => {
      this.number = nowNumber
    })
  }
}
</script>

<style scoped>
* {
  margin: 0;
}
img {
  width: 100%;
  height: 80vh;
}

</style>
