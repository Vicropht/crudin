const update = document.querySelector('#nuke')

update.addEventListener('click', _ => {
    fetch('/quotes', {
        method: 'put',
        header: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: 'Duke Nukem',
            quote: "It's time to kick ass and chew bubble gum, and I'm all outta gum!"
        })
    })
})