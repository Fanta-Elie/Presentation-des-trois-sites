var carrousel = {
  nombreSlide : 0, 
  nombreObject: 1,
  elementObject : null,
  element : null,
  chrono: null,
  initialiser : function(element) {
    this.nombreSlide = element.find(".slide").length;
    element.append('<div class="navigation"></div>');
    for (var i = 1; i<=this.nombreSlide;i++) {
      element.find(".navigation").append("<span>"+ i +"</span>");
    }
    element.find(".navigation span").click(function(){
      carrousel.animationSlide($(this).text());
      carrousel.play();
    });
    this.element=element;
    element.find(".slide").hide();
    element.find(".slide:first").show();
    this.elementObject = element.find(".slide:first");
    this.element.find(".navigation span:first").addClass("active");
    carrousel.play();
  },
  animationSlide : function(num) {
    num = parseInt(num);
    if (num == this.nombreObject){ return false; }
    /* Animation en fadeOut et fadeIn
    this.elementObject.fadeOut();
    this.element.find("#slide"+num).fadeIn();
    */
    /* Animation en slide */
    var sens = 1;
    if(num<this.elementObject){ sens = -1;}
    var cssDebut = {"left" : sens*this.element.width()};
    var cssFin = {"left" : -sens*this.element.width()};
    this.element.find("#slide"+num).show().css(cssDebut);
    this.element.find("#slide"+num).animate({"top":0, "left":0}, 2500);
    this.elementObject.animate(cssFin, 2500);
    this.element.find(".navigation span").removeClass("active");
    this.element.find(".navigation span:eq("+(num-1)+")").addClass("active");
    this.nombreObject = num;
    this.elementObject = this.element.find("#slide"+num);
  },
  apres : function() {
    var timer = this.nombreObject+1;
    if (timer >this.nombreSlide) {
      timer = 1;   
    }
    this.animationSlide(timer);
  },
  stop : function() {
    window.clearInterval(this.chrono);
  },
  play : function() {
    window.clearInterval(this.chrono);
    this.chrono = window.setInterval("carrousel.apres()", 9000);
  }
  /* A garder pour une autre fois si un jour je met un bouton "avant et après".
  avant : function() {
    var timer = this.nombreObject-1;
    if (timer < 1) {
        timer = this.nombreSlide;   
    }
    this.animationSlide(timer);
},
*/
}
$(function(){
  carrousel.initialiser($("#carrousel"));
});