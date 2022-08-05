CREATE MIGRATION m1i37pdvpn7llda3skyhjmygpdmbbj5oxkvz6ahepmykfukmqs7cla
    ONTO m1yheofyaga7xlsoarimdgujxxfsezi7kbbecgrocl2dstlqhjqmgq
{
  ALTER TYPE default::User {
      ALTER PROPERTY displayName {
          CREATE CONSTRAINT std::exclusive;
      };
  };
};
