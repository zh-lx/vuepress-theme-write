<script setup lang="ts">
import { computed, ref, toRefs, watch } from 'vue';
import type { PropType } from 'vue';
import { useRoute } from 'vue-router';
import type { NavbarItem, ResolvedNavbarItem, NavGroup } from '@/types';
import AutoLink from '@/components/AutoLink.vue';
import DropdownTransition from '@/components/DropdownTransition.vue';

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
                    (child as NavGroup<ResolvedNavbarItem>).children.length === 0 &&
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
                    isLastItemOfArray(grandchild, (child as NavGroup<ResolvedNavbarItem>).children) &&
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
    font-size: 0.9rem;
    font-family: inherit;
    cursor: inherit;
    padding: inherit;
    line-height: 1.4rem;
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
      margin-left: 0.4rem;
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
      line-height: 1.7rem;

      .navbar-dropdown-subtitle {
        margin: 0.45rem 0 0;
        border-top: 1px solid var(--c-border);
        padding: 1rem 0 0.45rem 0;
        font-size: 0.9rem;

        & > span {
          padding: 0 1.5rem 0 1.25rem;
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
        line-height: 1.7rem;
        position: relative;
        border-bottom: none;
        font-weight: 400;
        margin-bottom: 0;
        padding: 0 1.5rem 0 1.25rem;
        color: var(--common-text-color);

        &:hover {
          color: var(--common-hover-color);
        }

        &.router-link-active {
          color: var(--common-hover-color);

          &::after {
            content: '';
            width: 0;
            height: 0;
            border-left: 5px solid var(--common-hover-color);
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
      margin-bottom: 0.5rem;
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
          color: var(--common-text-color);
          font-size: 15px;
          line-height: 2rem;
        }

        .navbar-dropdown-subitem {
          font-size: 14px;
          padding-left: 1rem;
        }
      }
    }
  }
}

@media (min-width: ($MQMobile + 1)) {
  .navbar-dropdown-wrapper {
    height: 1.8rem;

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
      max-height: calc(100vh - 2.7rem);
      overflow-y: auto;
      position: absolute;
      top: 100%;
      right: 0;
      padding: 0.6rem 0;
      border: var(--common-border);
      background-color: var(--common-bgc);
      border-radius: 4px;
      text-align: left;
      white-space: nowrap;
      margin: 0;
    }
  }
}
</style>
