const MAX_LENGTH = 99;  // 播放列表最多音乐数量

// 音乐堆栈，存放已经播放过的音乐列表，
//用于切换到上一首音乐，
//最大长度为无限长
var musicStack = undefined;
var ptr = 0;  // 指定当前播放音乐在音乐堆栈中的位置，始终大于0

/**
 * description 对音乐播放列表进行操作
 * param {Array} list 播放列表
 * param {string} operation 操作数
 * param {object} value 操作值 
 * return: 操作成功返回新的播放列表，更新错误返回 错误提示 “overflow” 或者 “exist”
 */
const playListOperation = ( list, operation, value ) => {
  var new_list = JSON.parse(JSON.stringify(list));

  switch ( operation ) {
    case "add":       // 播放列表末尾加入一首歌曲，value：object--音乐信息
      if ( new_list.length < MAX_LENGTH ) {
        var key = false;
        new_list.forEach(item => {
          if ( item.music_id === value.music_id )
            key = true;
        });
        if ( key === true ) 
          return "已存在";
        else
          new_list.push(JSON.parse(JSON.stringify(value)));
      } else {
        return "超过最大长度";
      }
      break;
    case "totop":     // 将一首音乐置顶，value：number--该音乐在原播放列表中的位置
      const m = new_list.splice(value, 1)[0];
      new_list.unshift(m);
      break;
    case "remove":    // 从播放列表中删除某一首音乐，value：number--该音乐在原播放列表中的位置
      new_list.splice(value, 1);
      break;
    case "update":    // 完全更新播放列表，value：array--新的播放列表，长度应小于最大长度 MAX_LENGTH
      new_list = JSON.parse(JSON.stringify(value));
      if ( new_list.length > MAX_LENGTH )
        return "超过最大长度";
      break;
    default:
      console.error("No Such Operation!");
  }

  return new_list;
};

/**
 * description 存储播放列表到 localStorage 中
 * param {*} list 播放列表
 */
const storePlayList = playList => {
  window.localStorage.setItem("playList", JSON.stringify(playList));
};

/**
 * description 初始化音乐堆栈
 * value： 音乐堆栈的第一个元素 
 */
const initMusicStack = value => {
  musicStack = [];
  musicStack.push(JSON.parse(JSON.stringify(value)));
}
 
/**
 * description 选择下一首需要播放的音乐
 * list: 音乐播放列表
 * operation：选择下一首音乐的操作
 * currentIndex: 当前播放音乐在播放列表中的位置
 * value: 不为bull时表示不从列表中选择歌曲播放
 * return: 切换成功返回【next_music， next_index】
 */
const chooseNextMusic = ({ list, currentIndex, operation=null, value=null }) => {
  const play_list_length = list.length;
  var next_index = currentIndex;    // 下一首音乐在播放列表中的位置
  var next_music = null;            // 下一首音乐包含的信息

  if ( !value ) {
    switch ( operation ) {
      case "sequential":  // 按照播放列表顺序选择下一首音乐
        next_index = (currentIndex + 1) % play_list_length;
        next_music = JSON.parse(JSON.stringify(list[next_index]));
        break;
      case "random":      // 在播放列表中随机挑选下一首音乐
        next_index = parseInt(Math.random() * play_list_length);
        next_music = JSON.parse(JSON.stringify(list[next_index]));
        break;
      case "loop":        // 单曲循环播放
        next_index = currentIndex >= play_list_length ? 0 : currentIndex;
        next_music = JSON.parse(JSON.stringify(musicStack[ptr]));
        break;
      default:
        console.error("Parameter Operation Error!");
    }
  } else if ( typeof value === "object" ) {
    next_music = JSON.parse(JSON.stringify(value));
  } 

  /* 对堆栈的操作 */
  if ( next_music.music_id !== musicStack[ptr].music_id ) {
    if ( ptr === 0 ) {
      musicStack.unshift(next_music);
    } else if ( ptr > 0 ) {
      if ( !value ) {
        ptr = ptr - 1;
        return [musicStack[ptr], currentIndex];
      } else {
        musicStack = musicStack.slice(ptr);
        musicStack.unshift(next_music);
        ptr = 0;
      }
    }
  }

  return [next_music, next_index];
};

/**
 * description 切换回上一首播放的音乐
 */
const switchToLastMusic = index => {
  const stack_length = musicStack.length;
  if ( stack_length === 1 ) {
    return [musicStack[0], index];
  } else {
    ptr = ptr + 1;
    return [musicStack[ptr], index];
  }
};

export {
  MAX_LENGTH,
  playListOperation,
  storePlayList,
  initMusicStack,
  chooseNextMusic,
  switchToLastMusic,
};