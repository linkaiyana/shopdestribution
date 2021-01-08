(() => {
  function resize() {
    const baseFontSize = 16; // 100px相当于1rem，便于计算
    const designFontSize = 375; // 设计稿的尺寸
    const width = window.innerWidth; // 屏幕宽度
    const currentFontSize = (width / designFontSize) * baseFontSize;
    document.querySelector('html').style.fontSize = `${currentFontSize}px`;
  }

  window.onresize = () => {
    resize();
  };

  document.addEventListener('DOMContentLoaded', resize);
})();
