<script setup lang="ts">
import { computed, ref, toRefs, watch } from 'vue';
import type { PropType } from 'vue';
import { useRoute } from 'vue-router';
import type { NavbarItem, ResolvedNavbarItem, NavGroup } from '@/types';
import AutoLink from '@/components/auto-link/index.vue';
import DropdownTransition from '@/components/dropdown-transition/index.vue';

const props = defineProps({
  item: {
    type: Object as PropType<Exclude<ResolvedNavbarItem, NavbarItem>>,
    required: true,
  },
});

const { item } = toRefs(props);

const dropdownAriaLabel = computed(
  () => item.value.ariaLabel || item.value.text
);

const open = ref(false);
const route = useRoute();
watch(
  () => route.path,
  () => {
    open.value = false;
  }
);

/**
 * Open the dropdown when user tab and click from keyboard.
 *
 * Use event.detail to detect tab and click from keyboard.
 * The Tab + Click is UIEvent > KeyboardEvent, so the detail is 0.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/UIEvent/detail
 */
const handleDropdown = (e): void => {
  const isTriggerByTab = e.detail === 0;
  if (isTriggerByTab) {
    open.value = !open.value;
  } else {
    open.value = false;
  }
};

const isLastItemOfArray = (item: unknown, arr: unknown[]): boolean =>
  arr[arr.length - 1] === item;
</script>

<template>
  <div class="navbar-dropdown-wrapper" :class="{ open }">
    <button
      class="navbar-dropdown-title"
      type="button"
      :aria-label="dropdownAriaLabel"
      @click="handleDropdown"
    >
      <span class="title">{{ item.text }}</span>
      <span class="arrow down" />
    </button>

    <button
      class="navbar-dropdown-title-mobile"
      type="button"
      :aria-label="dropdownAriaLabel"
      @click="open = !open"
    >
      <span class="title">{{ item.text }}</span>
      <span class="arrow" :class="open ? 'down' : 'right'" />
    </button>

    <DropdownTransition>
      <ul v-show="open" class="navbar-dropdown">
        <li
          v-for="child in item.children"
          :key="child.text"
          class="navbar-dropdown-item"
        >
          <template v-if="(child as NavGroup<ResolvedNavbarItem>).children">
            <h4 class="navbar-dropdown-subtitle">
              <AutoLink
                v-if="(child as NavbarItem).link"
                :item="(child as NavbarItem)"
                @focusout="
                  isLastItemOfArray(child, item.children) &&
                    (child as NavGroup<ResolvedNavbarItem>).children.length ===
                      0 &&
                    (open = false)
                "
              />

              <span v-else>{{ child.text }}</span>
            </h4>

            <ul class="navbar-dropdown-subitem-wrapper">
              <li
                v-for="grandchild in (child as NavGroup<ResolvedNavbarItem>).children"
                :key="(grandchild as NavbarItem).link"
                class="navbar-dropdown-subitem"
              >
                <AutoLink
                  :item="(grandchild as NavbarItem)"
                  @focusout="
                    isLastItemOfArray(
                      grandchild,
                      (child as NavGroup<ResolvedNavbarItem>).children
                    ) &&
                      isLastItemOfArray(child, item.children) &&
                      (open = false)
                  "
                />
              </li>
            </ul>
          </template>

          <template v-else>
            <AutoLink
              :item="(child as NavbarItem)"
              @focusout="
                isLastItemOfArray(child, item.children) && (open = false)
              "
            />
          </template>
        </li>
      </ul>
    </DropdownTransition>
  </div>
</template>

<style scoped lang="scss">
@import '~@/styles/_wrapper.scss';
@import '~@/styles/_variables.scss';

.navbar-dropdown-wrapper {
  cursor: pointer;

  .navbar-dropdown-title {
    display: block;
    font-size: 12px;
    font-family: inherit;
    cursor: inherit;
    padding: inherit;
    line-height: 20px;
    background: transparent;
    border: none;
    font-weight: 500;
    color: var(--c-text);

    &:hover {
      border-color: transparent;
    }

    .arrow {
      vertical-align: middle;
      margin-top: -1px;
      margin-left: 6px;
    }
  }

  .navbar-dropdown-title-mobile {
    @extend .navbar-dropdown-title;
    display: none;
    font-weight: 600;
    font-size: inherit;
    &:hover {
      color: var(--c-text-accent);
    }
  }

  .navbar-dropdown {
    .navbar-dropdown-item {
      color: inherit;
      line-height: 24px;

      .navbar-dropdown-subtitle {
        margin: 6px 0 0;
        border-top: 1px solid var(--c-border);
        padding: 14px 0 6px 0;
        font-size: 12px;

        & > span {
          padding: 0 22px 0 18px;
        }

        & > a {
          font-weight: inherit;
          &.router-link-active {
            &::after {
              display: none;
            }
          }
        }
      }

      .navbar-dropdown-subitem-wrapper {
        padding: 0;
        list-style: none;

        .navbar-dropdown-subitem {
          font-size: 0.9em;
        }
      }

      a {
        display: block;
        line-height: 24px;
        position: relative;
        border-bottom: none;
        font-weight: 400;
        margin-bottom: 0;
        padding: 0 22px 0 18px;
        color: var(--color-text-8);

        &:hover {
          color: var(--blue-6);
        }

        &.router-link-active {
          color: var(--blue-6);

          &::after {
            content: '';
            width: 0;
            height: 0;
            border-left: 5px solid var(--blue-6);
            border-top: 3px solid transparent;
            border-bottom: 3px solid transparent;
            position: absolute;
            top: calc(50% - 2px);
            left: 9px;
          }
        }
      }

      &:first-child .navbar-dropdown-subtitle {
        margin-top: 0;
        padding-top: 0;
        border-top: 0;
      }
    }
  }
}

@media (max-width: $MQMobile) {
  .navbar-dropdown-wrapper {
    &.open .navbar-dropdown-title {
      margin-bottom: 8px;
    }

    .navbar-dropdown-title {
      display: none;
    }

    .navbar-dropdown-title-mobile {
      display: block;
    }

    .navbar-dropdown {
      @include dropdown_wrapper;

      .navbar-dropdown-item {
        .navbar-dropdown-subtitle {
          border-top: 0;
          margin-top: 0;
          padding-top: 0;
          padding-bottom: 0;
        }

        .navbar-dropdown-subtitle,
        & > a {
          color: var(--color-text-8);
          font-size: 15px;
          line-height: 28px;
        }

        .navbar-dropdown-subitem {
          font-size: 14px;
          padding-left: 14px;
        }
      }
    }
  }
}

@media (min-width: ($MQMobile + 1)) {
  .navbar-dropdown-wrapper {
    height: 26px;

    &:hover .navbar-dropdown,
    &.open .navbar-dropdown {
      // override the inline style.
      display: block !important;
    }

    &.open:blur {
      display: none;
    }

    .navbar-dropdown {
      display: none;
      // Avoid height shaked by clicking
      height: auto !important;
      box-sizing: border-box;
      max-height: calc(100vh - 38px);
      overflow-y: auto;
      position: absolute;
      top: 100%;
      right: 0;
      padding: 8px 0;
      border: var(--color-border-2);
      background-color: var(--common-bgc);
      border-radius: 4px;
      text-align: left;
      white-space: nowrap;
      margin: 0;
    }
  }
}
</style>
