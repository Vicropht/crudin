const update = document.querySelector('#nuke')

update.addEventListener('click', _ => {
    fetch('/quotes', {
        method: 'put',
        header: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: 'Test',
            quote: "Test"
        })
    })
})
