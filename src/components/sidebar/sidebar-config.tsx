import {
    IconActivityHeartbeat,
    IconArchive,
    IconBackground,
    IconBellRinging,
    IconBrandNpm,
    IconBug,
    IconChartBar,
    IconCloud,
    IconDatabase,
    IconFileText,
    IconFolder,
    IconFolders,
    IconGitCommit,
    IconGitMerge,
    IconGitPullRequest,
    IconHome,
    IconKey,
    IconLockExclamation,
    IconLockPassword,
    IconPackageExport,
    IconPackages,
    IconPasswordFingerprint,
    IconPlayerPlay,
    IconScanEye,
    IconSettings,
    IconShieldLock,
    IconStar,
    IconTarget,
    IconTerminal2,
    IconUser,
    IconUserPlus,
    IconWebhook
} from '@tabler/icons-react'
import type { SidebarItem } from './types'
import {
    getRepositoriesCount,
    getPullRequestsCount,
    getIssuesCount,
    getSecurityCount
} from './badge-helpers'

export const sidebarItems: SidebarItem[] = [
    {
        id: 'overview',
        label: 'Overview',
        icon: IconHome,
        subItems: [
            {
                id: 'dashboard',
                label: 'Dashboard',
                icon: IconChartBar,
                route: '/overview/dashboard'
            },
            {
                id: 'activity',
                label: 'Activity',
                icon: IconActivityHeartbeat,
                route: '/overview/activity'
            },
            {
                id: 'insights',
                label: 'Insights',
                icon: IconTarget,
                route: '/overview/insights'
            }
        ]
    },
    {
        id: 'repositories',
        label: 'Repositories',
        icon: IconFolders,
        badge: getRepositoriesCount,
        subItems: [
            {
                id: 'all-repos',
                label: 'All Repositories',
                icon: IconFolder,
                route: '/repositories'
            },
            {
                id: 'starred',
                label: 'Starred',
                icon: IconStar,
                route: '/repositories/starred'
            },
            {
                id: 'archived',
                label: 'Archived',
                icon: IconArchive,
                route: '/repositories/archived'
            }
        ]
    },
    {
        id: 'pull-requests',
        label: 'Pull Requests',
        icon: IconGitPullRequest,
        badge: getPullRequestsCount,
        subItems: [
            {
                id: 'open-prs',
                label: 'Open',
                icon: IconGitPullRequest,
                route: '/pull-requests/open'
            },
            {
                id: 'review-requests',
                label: 'Review Requests',
                icon: IconScanEye,
                route: '/pull-requests/review'
            },
            {
                id: 'merged',
                label: 'Merged',
                icon: IconGitMerge,
                route: '/pull-requests/merged'
            }
        ]
    },
    {
        id: 'issues',
        label: 'Issues',
        icon: IconBug,
        badge: getIssuesCount,
        subItems: [
            {
                id: 'open-issues',
                label: 'Open Issues',
                icon: IconBug,
                route: '/issues/open'
            },
            {
                id: 'assigned',
                label: 'Assigned to Me',
                icon: IconUserPlus,
                route: '/issues/assigned'
            },
            {
                id: 'created',
                label: 'Created by Me',
                icon: IconGitCommit,
                route: '/issues/created'
            }
        ]
    },
    {
        id: 'actions',
        label: 'Actions',
        icon: IconBackground,
        subItems: [
            {
                id: 'workflows',
                label: 'Workflows',
                icon: IconPlayerPlay,
                route: '/actions/workflows'
            },
            {
                id: 'runners',
                label: 'Runners',
                icon: IconTerminal2,
                route: '/actions/runners'
            },
            {
                id: 'deployments',
                label: 'Deployments',
                icon: IconCloud,
                route: '/actions/deployments'
            }
        ]
    },
    {
        id: 'packages',
        label: 'Packages',
        icon: IconPackages,
        subItems: [
            {
                id: 'published',
                label: 'Published',
                icon: IconPackageExport,
                route: '/packages/published'
            },
            {
                id: 'container-registry',
                label: 'Container Registry',
                icon: IconDatabase,
                route: '/packages/containers'
            },
            {
                id: 'npm-packages',
                label: 'npm Packages',
                icon: IconBrandNpm,
                route: '/packages/npm'
            }
        ]
    },
    {
        id: 'security',
        label: 'Security',
        icon: IconLockPassword,
        badge: getSecurityCount,
        subItems: [
            {
                id: 'alerts',
                label: 'Security Alerts',
                icon: IconLockExclamation,
                route: '/security/alerts'
            },
            {
                id: 'advisories',
                label: 'Advisories',
                icon: IconShieldLock,
                route: '/security/advisories'
            },
            {
                id: 'secrets',
                label: 'Secrets',
                icon: IconPasswordFingerprint,
                route: '/security/secrets'
            }
        ]
    },
    {
        id: 'settings',
        label: 'Settings',
        icon: IconSettings,
        subItems: [
            {
                id: 'profile',
                label: 'Profile',
                icon: IconUser,
                route: '/settings/profile'
            },
            {
                id: 'notifications',
                label: 'Notifications',
                icon: IconBellRinging,
                route: '/settings/notifications'
            },
            {
                id: 'webhooks',
                label: 'Webhooks',
                icon: IconWebhook,
                route: '/settings/webhooks'
            },
            {
                id: 'api-keys',
                label: 'API Keys',
                icon: IconKey,
                route: '/settings/api-keys'
            }
        ]
    },
    {
        id: 'docs',
        label: 'Documentation',
        icon: IconFileText,
        route: '/docs'
    }
]
