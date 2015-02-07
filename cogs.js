module.exports = {

  watch: {
    paths: ['src']
  },

  in: {
    scss: {
      out: 'css',
      transformers: 'sass'
    }
  },

  builds: {
    'src/stylesheets/*': 'public/stylesheets',
    'src/stylesheets/**/*': 'public/stylesheets/'
  }
};