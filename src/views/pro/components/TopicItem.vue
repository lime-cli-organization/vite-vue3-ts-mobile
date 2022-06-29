<template>
  <div class="topic_item" :class="level === 0 ? 'first' : ''">
    <div class="question" v-html="data?.question"></div>
    <!-- 是否存在子题 -->
    <template v-if="!data?.hasSub">
      <!-- 未下载是否隐藏答案和解析 -->
      <template v-if="showAnswer">
        <div class="answer row innerAnswer" v-if="innerAnswer">
          <span class="label">【答案】</span>
          <span class="value" v-html="data?.answer"></span>
        </div>
        <div class="operation_row" :class="data.isRight === undefined ? 'tip' : ''">
          <div class="left">
            <slot name="operationLeft"></slot>
          </div>
          <div class="right">
            <div class="btn small " :class="isShow ? 'de_active' : 'active '" @click="toggle">{{ isShow ? '收起' : '解析' }}
            </div>
            <img v-if="!isLike" @click.stop="setLike(true)" src="@/assets/star.png" alt="收藏">
            <img v-if="isLike" @click.stop="setLike(false)" src="@/assets/star_active.png" alt="取消收藏">
          </div>
        </div>
        <template v-if="isShow">
          <div class="toggle_content">
            <div class="analysis">
              <div class="row" v-if="!innerAnswer">
                <span class="label">【答案】</span>
                <span class="value">答案</span>
              </div>
              <div class="row">
                <span class="label">【解析】</span>
                <span class="value">解析</span>
              </div>
              <div class="row">
                <span class="label">【答案】</span>
                <span class="value">答案</span>
              </div>
            </div>
          </div>
          <div class="bottom">
            <div class="right">
              <div class="btn regular plain">同类练习</div>
              <div v-if="data.hasVideo" class="btn regular active">视频学习</div>
            </div>
          </div>
        </template>
      </template>
    </template>
    <template v-if="data?.topicSub" v-for="item in data.topicSub">
      <TopicItem :data="item" :level="level + 1" :innerAnswer="innerAnswer" :showAnswer="showAnswer"
        @onSuccess="setLike">
        <template #operationLeft>
          <LRadio v-model="item.isRight" @change="setRight" />
        </template>
      </TopicItem>
    </template>
  </div>
</template>

<script lang="ts" >
import { Paper } from "@/apis/Paper";
import { SetLike } from "@/apis/Topic";
import { defineComponent, PropType, ref } from "vue";
import LRadio from '../components/LRadio.vue';
export default defineComponent({
  name: "TopicItem",
  components: { LRadio },
  props: {
    data: {
      required: true,
      type: Object as PropType<Paper.ITopicItem>,
    },
    innerAnswer: {
      required: false,
      default: false,
    },
    level: {
      required: true,
      default: 0
    },
    showAnswer: {
      default: false
    }
  },
  emits: ['onSuccess'],
  // ctx: {attrs, emit, expose, slots}
  setup(props, { emit, slots }) {
    const { operationLeft } = slots;

    const { data: item } = props;

    const isLike = ref(item.isLike);
    const isFetching = ref(false);
    const setLike = async (type: boolean) => {
      if (!isFetching.value) {
        isFetching.value = true;
        try {
          if (!item.hasSub) {
            const { code, msg, data } = await SetLike({
              topicId: props.data.topicId,
              type
            })
            isFetching.value = false;
            if (code === 200) {
              isLike.value = !isLike.value;
              emit('onSuccess', type)
            }
          }
        } catch (error) {
          isFetching.value = false;
        }
      }
    }

    const isShow = ref(false);
    const toggle = () => {
      isShow.value = !isShow.value;
    }

    const setRight = (data: string) => {
      console.log(data);
    }

    return {
      isShow,
      toggle,
      isLike,
      setLike,
      setRight,
      operationLeft
    };
  },
})
</script>
<style lang="less" scoped>
.topic_item {
  width: 100%;
  background: #FFFFFF;
  border-bottom: 1px solid #E5E5E5;

  &.first {
    box-shadow: 0px 8px 21px 1px #E9ECF4;
    border-radius: 30px;
    overflow: hidden;
    margin: 30px auto;
    border-bottom: none;

    .topic_item:last-of-type {
      border-bottom: none;
    }
  }

}

.question {
  padding: 28px 28px 20px;
  line-height: 1.5;
  font-size: 24px;
  color: @textPrimary;
}

.row {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 12px 28px;

  .label {
    font-weight: bold;
    color: #49a3ff;
    flex-shrink: 0;
  }

  .value {
    color: @textPrimary;
    font-size: 24px;
    line-height: 1.5;
  }
}

.innerAnswer {
  width: 90%;
  box-sizing: border-box;
  margin: 0 auto 24px;
  padding: 24px 12px;
  background: #ffffff;
  box-shadow: 0px 1px 8px 1px rgb(233 236 244 / 81%);
  border-radius: 10px;
}

.operation_row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 24px 28px;
  border-top: 1px solid #E5E5E5;

  &.tip {
    background-color: #fffbf7;
  }

  .left {
    color: #C2C4CC;
  }

  .left,
  .right {
    display: flex;
    flex-direction: row;
    align-items: center;

    img {
      width: 30px;
      height: 30px;
      margin-left: 12px;
    }
  }
}

.toggle_content {
  border-top: 1px dashed #E5E5E5;
}

.bottom {
  padding: 24px 28px;
  border-top: 1px solid #E5E5E5;

  .right {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: flex-end;

    .btn {
      margin-left: 12px;
    }
  }
}
</style>