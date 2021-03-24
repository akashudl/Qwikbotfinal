const AWS = require('aws-sdk');
// Set the region 
AWS.config.update({region: 'REGION'});

var roleToAssume = {RoleArn: 'arn:aws:iam::075496705643:role/r_scheduler',
                    RoleSessionName: 'r_scheduler',
                    DurationSeconds: 900,
                
                };
                sts.assumeRole(roleToAssume, function(err, data) {
                    if (err) console.log(err, err.stack);
                    else{
                        roleCreds = {accessKeyId: data.Credentials.AccessKeyId,
                                     secretAccessKey: data.Credentials.SecretAccessKey,
                                     sessionToken: data.Credentials.SessionToken};
                        stsGetCallerIdentity(roleCreds);
                    }
                });
                