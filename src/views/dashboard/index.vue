<template>
  <div class="dashboard-container">
    <title>
      {{ $t('route.dashboard') }}
    </title>
    <component :is="currentRole" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import adminDashboard from './admin'
import enterpriseDashboard from './enterprise'
import memberDashboard from './member'
import { getToken } from '@/utils/auth'

export default {
  name: 'Dashboard',
  components: { adminDashboard, enterpriseDashboard, memberDashboard },
  data() {
    return {
      currentRole: 'adminDashboard'
    }
  },
  computed: {
    ...mapGetters(['roles'])
  },
  created() {
    if (this.roles.includes('1')) {
      this.currentRole = 'adminDashboard'
    } else if (this.roles.includes('5')) {
      this.currentRole = 'enterpriseDashboard'
    } else {
      this.currentRole = 'memberDashboard'
    }
  },
  methods: {}
}
</script>
