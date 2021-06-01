let cells = document.querySelectorAll('.cell')
    var player="O";
    var clickCount = 0;
    currentPlayer()
    choosePlayer();
    // reset game by reloading page
    $('.reset').on('click', function(){
      window.location.reload()
    })
    $(cells).each(function(index, box){
      $(box).one('click', function(){
        clickCount += 1;
        setPlayer(this);

        // if number of clicks is 3 or more then check the numb
        if(clickCount>=5){
          checkRow(this.id)
          checkColumn(this.id)
          checkDiagonal(this.id)
        }
      })
    })

    // function to set players and display player text
    function setPlayer(elem){
      elem.innerHTML = player;
      if(player=='O'){
        player='X'
      }else{
        player = 'O'
      }
      // display current player
      currentPlayer()
    }

    // to chose player
    function choosePlayer(){
      $('.xplayer').one('click', function(){
        player = 'X';
        $('#choose-player').addClass('d-none')
        currentPlayer()
      })
      $('.oplayer').one('click', function(){
        player = 'O';
        $('#choose-player').addClass('d-none')
        currentPlayer()
      })
    }

    // append current player
    function currentPlayer(){
      $('#current-player')[0].innerText = player+" )"
    }

    // check winner
    function checkWinner(a,b,c){
      debugger
      if (a[0].innerText==b[0].innerText && b[0].innerText==c[0].innerText && a[0].innerText!=''){
        alert("Winner is: " + a[0].innerText)
      }
    }

    // print winner and stop
    function printWinner(elemId){
      $('#winner').children().remove();
      $('#winner').append("Winner is: "+ $(elemId).innerText)
    }

    // check row
    function checkRow(id){
      let i = id.split('')[0]
      if (checkWinner($('#'+i+'1'), $('#'+i+'2'), $('#'+i+'3'))){
        printWinner(id)
      }
    }

    // check column
    function checkColumn(id){
      let i = id.split('')[1]
      if (checkWinner($('#'+'1'+ i), $('#'+'2'+i), $('#'+'3'+i))){
        printWinner(id)
      }
    }
    
    // check diagonal
    function checkDiagonal(id){
      let i = id.split('')[0];
      let j = id.split('')[1];
      if(i==j){
        if(checkWinner($('#11'), $('#22'), $('#33'))){
          printWinner(id)
        }
      }else {
        if(checkWinner($('#13'), $('#22'), $('#31'))){
          printWinner(id)
        }
      }
    }