import TEMP_ACTION from "../actions/actions";

function reducer(state, action) {
    console.log(action);
    switch(action.type) {
        case TEMP_ACTION: {
            return {
                ...state,
                // moves:
            };
        }


        default: return state;
    }
}
// ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r']
function getMoves(figure, pos) {
    switch (figure) {
        case 'r':
        case 'R':
            break;
        case 'n':
        case 'N':
            break;
        case 'b':
        case 'B':
            break;
        case 'q':
        case 'Q':
            break;
        case 'k':
        case 'K':
            break;
        case 'p':
        case 'P':

            break;

    }
}
//     var possible=[[x+2,y+1],[x+2,y-1],[x-2,y+1],[x-2,y-1],[x+1,y+2],[x+1,y-2],[x-1,y+2],[x-1,y-2]];
//     possible.forEach(([xx,yy])=>{
//         if(xx>=0 && xx<8 && yy>=0 && yy<8){
//             // do some
//         }
//     });
// }

export default reducer