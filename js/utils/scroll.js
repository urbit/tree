import TreeActions from '../actions/TreeActions';

export default {
  w: null, // width
  $d: null, // container
  $n: null, // nav
  nh: null, // nav height cached
  cs: null, // current scroll
  ls: null, // last scroll
  cwh: null, // current window height
  lwh: null, // last window height

  track() {
    this.w = $(window).width();
    this.$n = $('#head');
    this.$d = $('#head .ctrl');
    this.nh = $('#head .ctrl').outerHeight(true);
  },

  clearNav() {
    return this.$n.removeClass('m-up m-down m-fixed');
  },

  resize() {
    if (this.w > 1170) {
      this.clearNav();
    }
  },

  scroll() {
    if ((this.$n == null) || (this.$d == null)) {
      return;
    }
    this.cs = $(window).scrollTop();
    this.cwh = window.innerHeight;

    if (this.w > 767) {
      this.clearNav();
    }
    if (this.w < 767) {
      let ct;
      let top;
      const dy = this.ls - this.cs;

      this.$d.removeClass('focus');

      if (this.cs <= 0) {
        this.$n.removeClass('m-up');
        this.$n.addClass('m-down m-fixed');
        return;
      }

      // scrolling up
      if (dy > 0) {
        if (!this.$n.hasClass('m-down')) {
          this.$n.removeClass('m-up').addClass('m-down');
          ct = this.$n.offset().top;
          top = this.cs - this.nh;
          if ((this.cs > ct) && (this.cs < (ct + this.nh))) {
            top = ct;
          }
          // if top < 0 then top = 0
          this.$n.offset({ top });
        }
        // set fixed when at top
        if (this.$n.hasClass('m-down') &&
          !this.$n.hasClass('m-fixed') &&
          (this.$n.offset().top >= this.cs)) {
          this.$n.addClass('m-fixed');
          this.$n.attr({ style: '' });
        }
      }

      // scrolling down
      if (dy < 0) {
        if (this.cwh === this.lwh) {
          if (!this.$n.hasClass('m-up')) {
            this.$n.removeClass('m-down m-fixed').addClass('m-up');
            TreeActions.closeNav();
            $('.menu.open').removeClass('open');
            top = this.cs < 0 ? 0 : this.cs;
            ct = this.$n.offset().top;
            if ((top > ct) && (top < (ct + this.nh))) {
              top = ct;
            }
            this.$n.offset({ top });
          }
          // close when gone if open
          if (this.$n.hasClass('m-up') &&
            this.$d.hasClass('open')) {
            if (this.cs > (this.$n.offset().top + this.$n.height())) {
              TreeActions.closeNav();
            }
          }
        }
      }
    }

    this.ls = this.cs;
    this.lwh = this.cwh;
  },


  init() {
    setInterval(this.track.bind(this), 200);

    this.ls = $(window).scrollTop();
    this.cs = $(window).scrollTop();

    $(window).on('resize', this.resize.bind(this));
    return $(window).on('scroll', this.scroll.bind(this));
  },
};
