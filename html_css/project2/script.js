const move_box = document.getElementById('move-box')
const cursor = document.getElementById('cursor')
const textBox = document.getElementById('textBox')

move_box.addEventListener('mousemove', position => {
  gsap.to(cursor, {
    x: position.x,
    y: position.y - 5,
    duration: 1.5,
    ease: 'elastic.out(1,0.3)',
    
  })
})

textBox.addEventListener("mouseenter", ()=>{
    gsap.to(cursor , {
        scale:2.5,

    })
})
textBox.addEventListener("mouseleave", ()=>{
    gsap.to(cursor , {
        scale:1,
        
    })
})
