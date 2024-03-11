export default {
    namespace: 'upload',
    state: {
        imgList: [],
        role: 'teacher', //student, teacher
    },
    reducers: {
        saveImgList(state, action) {
            return {
                ...state,
                imgList: action.payload,
            };
        },
        saveRole(state, action) {
            return{
                ...state,
                role: action.payload
            }
        }
    },
}