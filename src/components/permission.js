export default (user) => {
  let permissions = {
    home: {
      create: true,
      update: true,
      view: true,
    },
    admin: {
      create: false,
      update: false,
      view: false,
    },
    cfgSession: {
      create: false,
      update: false,
      view: true,
    },
    cfgTools: {
      create: false,
      update: false,
      view: true,
    },
    timeline: {
      create: false,
      update: false,
      view: true,
    },
    preference: {
      create: false,
      update: false,
      view: false,
    },
    mediaLibrary: {
      create: false,
      update: false,
      view: false,
    },
    miniCfg: {
      create: false,
      update: false,
      view: false,
    },
    rewards: {
      create: false,
      update: false,
      view: true,
    },
    events: {
      create: false,
      update: false,
      view: true,
    },
    quiz: {
      create: false,
      update: false,
      view: true,
    },
    userManagement: {
      create: false,
      update: false,
      view: false,
    },
  };

  if (user && user.role === 'candidate') {
    permissions = {
      home: {
        create: true,
        update: true,
        view: true,
      },
      admin: {
        create: false,
        update: false,
        view: false,
      },
      cfgSession: {
        create: false,
        update: false,
        view: true,
      },
      cfgTools: {
        create: false,
        update: false,
        view: true,
      },
      timeline: {
        create: false,
        update: false,
        view: true,
      },
      preference: {
        create: false,
        update: false,
        view: false,
      },
      mediaLibrary: {
        create: false,
        update: false,
        view: false,
      },
      miniCfg: {
        create: false,
        update: false,
        view: false,
      },
      rewards: {
        create: false,
        update: false,
        view: true,
      },
      events: {
        create: false,
        update: false,
        view: true,
      },
      quiz: {
        create: false,
        update: false,
        view: true,
      },
      userManagement: {
        create: false,
        update: false,
        view: false,
      },
    };
  } else if (user && user.role === 'facilitator') {
    permissions = {
      home: {
        create: true,
        update: true,
        view: true,
      },
      admin: {
        create: false,
        update: false,
        view: true,
      },
      cfgSession: {
        create: false,
        update: false,
        view: true,
      },
      cfgTools: {
        create: false,
        update: false,
        view: true,
      },
      timeline: {
        create: true,
        update: true,
        view: true,
      },
      preference: {
        create: false,
        update: false,
        view: false,
      },
      mediaLibrary: {
        create: true,
        update: true,
        view: true,
      },
      miniCfg: {
        create: false,
        update: false,
        view: false,
      },
      rewards: {
        create: false,
        update: false,
        view: false,
      },
      events: {
        create: false,
        update: false,
        view: false,
      },
      quiz: {
        create: false,
        update: false,
        view: false,
      },
      userManagement: {
        create: false,
        update: false,
        view: false,
      },
    };
  } else if (user && user.role === 'content-manager') {
    permissions = {
      home: {
        create: true,
        update: true,
        view: true,
      },
      admin: {
        create: false,
        update: false,
        view: true,
      },
      cfgSession: {
        create: true,
        update: true,
        view: true,
      },
      cfgTools: {
        create: true,
        update: true,
        view: true,
      },
      timeline: {
        create: true,
        update: true,
        view: true,
      },
      preference: {
        create: false,
        update: false,
        view: false,
      },
      mediaLibrary: {
        create: true,
        update: true,
        view: true,
      },
      miniCfg: {
        create: true,
        update: true,
        view: true,
      },
      rewards: {
        create: true,
        update: true,
        view: true,
      },
      events: {
        create: true,
        update: true,
        view: true,
      },
      quiz: {
        create: true,
        update: true,
        view: true,
      },
      userManagement: {
        create: false,
        update: false,
        view: false,
      },
    };
  } else if (user && user.role === 'support') {
    permissions = {
      home: {
        create: false,
        update: false,
        view: false,
      },
      admin: {
        create: false,
        update: false,
        view: true,
      },
      cfgSession: {
        create: false,
        update: false,
        view: false,
      },
      cfgTools: {
        create: false,
        update: false,
        view: false,
      },
      timeline: {
        create: false,
        update: false,
        view: false,
      },
      preference: {
        create: true,
        update: true,
        view: true,
      },
      mediaLibrary: {
        create: false,
        update: false,
        view: false,
      },
      miniCfg: {
        create: false,
        update: false,
        view: false,
      },
      rewards: {
        create: false,
        update: false,
        view: false,
      },
      events: {
        create: false,
        update: false,
        view: false,
      },
      quiz: {
        create: false,
        update: false,
        view: false,
      },
      userManagement: {
        create: true,
        update: true,
        view: true,
      },
    };
  } else if (user && user.role === 'system-administrator') {
    permissions = {
      home: {
        create: false,
        update: false,
        view: true,
      },
      admin: {
        create: false,
        update: false,
        view: true,
      },
      cfgSession: {
        create: false,
        update: false,
        view: true,
      },
      cfgTools: {
        create: false,
        update: false,
        view: true,
      },
      timeline: {
        create: false,
        update: false,
        view: true,
      },
      preference: {
        create: true,
        update: true,
        view: true,
      },
      mediaLibrary: {
        create: false,
        update: false,
        view: true,
      },
      miniCfg: {
        create: false,
        update: false,
        view: true,
      },
      rewards: {
        create: false,
        update: false,
        view: true,
      },
      events: {
        create: false,
        update: false,
        view: true,
      },
      quiz: {
        create: false,
        update: false,
        view: true,
      },
      userManagement: {
        create: true,
        update: true,
        view: true,
      },
    };
  } else if (user && user.role === 'auditor') {
    permissions = {
      home: {
        create: false,
        update: false,
        view: true,
      },
      admin: {
        create: false,
        update: false,
        view: true,
      },
      cfgSession: {
        create: false,
        update: false,
        view: true,
      },
      cfgTools: {
        create: false,
        update: false,
        view: true,
      },
      timeline: {
        create: false,
        update: false,
        view: true,
      },
      preference: {
        create: false,
        update: false,
        view: true,
      },
      mediaLibrary: {
        create: false,
        update: false,
        view: true,
      },
      miniCfg: {
        create: false,
        update: false,
        view: true,
      },
      rewards: {
        create: false,
        update: false,
        view: true,
      },
      events: {
        create: false,
        update: false,
        view: true,
      },
      quiz: {
        create: false,
        update: false,
        view: true,
      },
      userManagement: {
        create: false,
        update: false,
        view: true,
      },
    };
  } else return permissions;

  return permissions;
};
